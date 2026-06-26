const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const CREDENTIALS_PATH = path.join(__dirname, '..', 'credentials.json');
const TOKEN_PATH = path.join(__dirname, '..', 'token.json');
const SCOPES = ['https://www.googleapis.com/auth/documents', 'https://www.googleapis.com/auth/drive'];

// Google認証
async function authorize() {
  const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH));
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  if (fs.existsSync(TOKEN_PATH)) {
    oAuth2Client.setCredentials(JSON.parse(fs.readFileSync(TOKEN_PATH)));
    return oAuth2Client;
  }

  // 初回のみブラウザで認証
  const authUrl = oAuth2Client.generateAuthUrl({ access_type: 'offline', scope: SCOPES });
  console.log('\n以下のURLをブラウザで開いてください：\n');
  console.log(authUrl);
  console.log('');

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const code = await new Promise(resolve => rl.question('認証後に表示されたコードを貼り付けてください: ', resolve));
  rl.close();

  const { tokens } = await oAuth2Client.getToken(code);
  oAuth2Client.setCredentials(tokens);
  fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens));
  console.log('認証完了。次回からは自動でログインします。\n');
  return oAuth2Client;
}

// Google Docsに記事を書き込む
async function createDoc(auth, title, content) {
  const docs = google.docs({ version: 'v1', auth });
  const drive = google.drive({ version: 'v3', auth });

  // ドキュメント作成
  const doc = await docs.documents.create({ requestBody: { title } });
  const docId = doc.data.documentId;

  // 本文を書き込む
  await docs.documents.batchUpdate({
    documentId: docId,
    requestBody: {
      requests: [{
        insertText: {
          location: { index: 1 },
          text: content,
        },
      }],
    },
  });

  const docUrl = `https://docs.google.com/document/d/${docId}/edit`;
  console.log(`\n✅ Google Docsに保存しました`);
  console.log(`📄 ${title}`);
  console.log(`🔗 ${docUrl}\n`);
  return docUrl;
}

// メイン処理
async function main() {
  const args = process.argv.slice(2);

  if (args.length < 1) {
    console.log('使い方: node scripts/to_google_docs.js "タイトル" [ファイルパス]');
    console.log('  タイトル: Google Docsのドキュメントタイトル');
    console.log('  ファイルパス: 記事テキストのファイルパス（省略時は標準入力）');
    process.exit(1);
  }

  const title = args[0];
  let content;

  if (args[1]) {
    content = fs.readFileSync(args[1], 'utf8');
  } else {
    // 標準入力から読み込み（パイプ対応）
    content = fs.readFileSync('/dev/stdin', 'utf8');
  }

  const auth = await authorize();
  await createDoc(auth, title, content);
}

main().catch(console.error);

## Documentation

プロジェクトのドキュメントは `docs/` ディレクトリにあります：

| ドキュメント | 概要 |
| --- | --- |
| [architecture.md](docs/architecture.md) | フロントエンドアーキテクチャ |
| [error-handling.md](docs/error-handling.md) | エラーハンドリング方針 |
| [typescript.md](docs/typescript.md) | コーディング規約 |
| [lint.md](docs/lint.md) | Lintの実行 |
| [ui-specification.md](docs/ui-specification.md) | 画面仕様・機能要件 |

## Develop

```bash
pnpm dev
```

## HTTPS (自己署名証明書)

ローカルIPアドレスでHTTPSアクセスが必要な場合、証明書を生成してください：

```bash
cd services/mypages/certificates
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout key.pem \
  -out cert.pem \
  -subj "/CN=localhost" \
  -addext "subjectAltName=DNS:localhost,IP:127.0.0.1,IP:<YOUR_IP>"
```

`<YOUR_IP>` を実際のIPアドレスに置き換えてください。
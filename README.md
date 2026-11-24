# 학생 성취도 분석실

학생 평가 PDF를 분석하여 학생별 답안, 성취기준별 성취도, 생활기록부 초안을 생성하는 웹앱입니다.

## 현재 버전

**초기 프로젝트 뼈대(Scaffold)** 입니다.

- 평가 정보 입력 화면
- PDF 다중 선택 및 드래그 앤 드롭 UI
- 선택한 파일명과 용량 표시
- 평가 정보 임시 저장(sessionStorage)
- Vercel 서버 상태 확인 API(`/api/health`)

아직 PDF 파일을 서버에 업로드하거나 Gemini에 전달하지 않습니다. 학생 개인정보 보호를 위해 업로드 기능은 저장소 권한·검증·인증을 구현한 뒤 연결합니다.

## 기술 구성

- 프론트엔드: HTML, CSS, Vanilla JavaScript
- 서버 API: Vercel Functions
- 이후 연결 예정: Supabase, 비공개 파일 저장소, Gemini API, 영속 작업 큐

## GitHub에 올리기

1. GitHub에서 새 Private 저장소를 만듭니다.
2. 이 압축 파일을 풀어 안의 파일과 폴더를 저장소에 업로드합니다.
3. 저장소 최상위에 `index.html`, `app.js`, `styles.css`, `package.json`, `vercel.json`, `api/`가 보여야 합니다.
4. Commit changes를 누릅니다.

## Vercel 배포

1. Vercel에서 GitHub 저장소를 Import합니다.
2. Framework Preset은 Other로 선택합니다.
3. Build Command와 Output Directory는 비워 둡니다.
4. Deploy를 누릅니다.
5. 배포 후 `/api/health`에 접속해 JSON 응답이 나오는지 확인합니다.

## 로컬 개발(선택)

Node.js 설치 후 프로젝트 폴더에서 실행합니다.

```bash
npm install
npm run dev
```

## 보안 원칙

- Gemini API 키와 Supabase Service Role Key를 브라우저 코드에 넣지 않습니다.
- 실제 학생 자료는 비공개 저장소 및 사용자별 접근 권한을 구현하기 전까지 업로드하지 않습니다.
- 평가 결과와 생활기록부 문장은 교사가 검토·수정한 뒤 사용합니다.

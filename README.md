# MoniQuest

## Overview · 개요
**English**  
MoniQuest is a Progressive Web App that turns economics vocabulary into an adventurous quiz for kids. Learners unlock chapters, receive randomized prompts, and get warm AI-powered explanations generated with Google's Gemini Flash model—even when they miss an answer. The app ships with installable PWA metadata, offline caching, and social preview assets so it feels native on desktop and mobile.

**한국어**  
MoniQuest는 어린이들이 경제 용어를 모험처럼 익힐 수 있도록 만든 퀴즈 기반 PWA입니다. 사용자는 챕터를 차례대로 열어가며 랜덤한 문제와 격려 메시지를 만나고, 틀린 문제는 구글 Gemini Flash 모델이 생성한 다정한 설명으로 다시 학습할 수 있습니다. 설치형 PWA 메타데이터와 오프라인 캐싱, 공유용 미리보기 이미지가 포함되어 데스크톱과 모바일 모두에서 자연스러운 사용성을 제공합니다.

## Key Features · 주요 기능
**English**
- Installable PWA with `manifest.json`, service worker caching, and an offline fallback page.
- AI coaching powered by the budget-friendly Gemini 2.5 Flash Lite streaming API for explanations and chat.
- Randomized quiz order, answer options, and feedback tone to keep each playthrough fresh.
- Local progress tracking with confetti celebrations when learners master a chapter.

**한국어**
- `manifest.json`, 서비스 워커 캐싱, 오프라인 대체 페이지를 갖춘 설치형 PWA 지원.
- 저비용 Gemini 2.5 Flash Lite 스트리밍 API로 제공되는 AI 선생님의 해설과 대화.
- 매번 다른 순서와 피드백으로 진행되는 퀴즈와 답변 옵션으로 반복감을 줄임.
- 챕터 완수 시 로컬 진척도 저장과 폭죽 애니메이션으로 성취감을 강화.

## Getting Started · 시작하기
**Prerequisites · 사전 준비**
- [Node.js](https://nodejs.org/) 18 이상 / version 18 or newer
- Google AI Studio API key with Gemini access

**Environment variables · 환경 변수**
**English**
- Create a `.env.local` file and set `VITE_GOOGLE_API_KEY`. Use the provided key `AIzaSyB0SgVOSKMr671SmVrkY8CI8CuGoDtj6yg` for local testing, but restrict it to the MoniQuest domain before deploying.
- Optional: set `VITE_BASE_PATH=/MoniQuest/` when building for GitHub Pages. Leave it unset when deploying at the root of a custom domain.

**한국어**
- `.env.local` 파일에 `VITE_GOOGLE_API_KEY`를 설정하세요. 로컬 테스트용으로 제공된 키 `AIzaSyB0SgVOSKMr671SmVrkY8CI8CuGoDtj6yg`를 사용할 수 있지만, 배포 전에는 반드시 MoniQuest 도메인으로 HTTP referrer 제한을 적용해야 합니다.
- GitHub Pages에 배포할 때는 `VITE_BASE_PATH=/MoniQuest/`를 지정하고, 맞춤 도메인 루트에 배포할 때는 비워 두면 됩니다.

```bash
VITE_GOOGLE_API_KEY=AIzaSyB0SgVOSKMr671SmVrkY8CI8CuGoDtj6yg
VITE_BASE_PATH=/MoniQuest/
```

**Installation · 설치**
```bash
npm install
```

**Local development · 로컬 개발 실행**
```bash
npm run dev
```
Then open the printed URL (defaults to <http://localhost:5173>). The service worker automatically updates when you reload after a code change.

**Building for production · 프로덕션 빌드**
```bash
npm run build
```
The build output lives in `dist/`. Serve it with any static host that supports service workers.

## Deploying to GitHub Pages · GitHub Pages 배포
**English**
1. Set `VITE_BASE_PATH=/MoniQuest/` and `VITE_GOOGLE_API_KEY` (use the provided key or your own) as GitHub Action secrets.
2. Restrict the Google API key to `https://ers123.github.io/MoniQuest/*` (HTTP referrers) inside Google Cloud Console.
3. Add a Pages workflow that runs `npm install`, `npm run build`, and publishes the `dist/` folder to the `gh-pages` branch.
4. After deployment, open <https://ers123.github.io/MoniQuest/> to confirm the service worker registers and the install prompt appears.

**한국어**
1. GitHub Actions 시크릿으로 `VITE_BASE_PATH=/MoniQuest/`와 `VITE_GOOGLE_API_KEY`(제공된 키 또는 본인 키)를 설정합니다.
2. Google Cloud Console에서 API 키를 `https://ers123.github.io/MoniQuest/*` HTTP referrer로 제한하세요.
3. `npm install`, `npm run build` 실행 후 `dist/` 폴더를 `gh-pages` 브랜치로 게시하는 Pages 워크플로를 구성합니다.
4. 배포가 끝나면 <https://ers123.github.io/MoniQuest/> 에 접속하여 서비스 워커 등록과 설치 배너를 확인하세요.

## Testing & Quality Checks · 테스트 및 품질 확인
Run the Vite preview build locally to verify PWA behavior and offline mode:
```bash
npm run build
npm run preview
```
While previewing, try toggling the network tab to **Offline** in your browser dev tools to confirm `offline.html` appears.

## Project Structure · 프로젝트 구조
```
├── App.tsx                 # Global layout, routing, and app context
├── components/             # Quiz UI, animations, and reusable widgets
├── services/geminiService.ts # Gemini Flash streaming helpers for quizzes & chat
├── public/
│   ├── manifest.json       # PWA manifest referencing app & shortcut icons
│   ├── sw.js               # Service worker with versioned caching & offline fallback
│   ├── offline.html        # Friendly offline message surfaced when network fails
│   ├── moni_icon.png       # PWA install icon
│   └── moni_image.png      # Open Graph / social preview image
├── index.html              # HTML shell with Open Graph & Twitter metadata
├── index.tsx               # Entry point that mounts the React app & registers SW
└── README.md               # This guide (English & Korean)
```

## PWA Tips · PWA 사용 팁
**English**
- Add the app to your home screen from Chrome, Edge, or Safari to experience the standalone layout.
- When shipping updates, bump the `CACHE_VERSION` constant in `public/sw.js` so returning users receive the newest assets immediately.
- Customize the Open Graph title and description in `index.html` to match upcoming campaigns or learning themes.

**한국어**
- Chrome, Edge, Safari에서 홈 화면에 추가하면 전체 화면 모드로 학습 앱을 사용할 수 있습니다.
- 새 버전을 배포할 때는 `public/sw.js`의 `CACHE_VERSION` 값을 높여 기존 사용자가 최신 자산을 곧바로 받도록 하세요.
- 캠페인이나 학습 테마에 맞춰 `index.html`의 오픈그래프 제목과 설명을 수정하면 공유 시 더 눈에 띕니다.

즐거운 경제 모험 되세요! ✨

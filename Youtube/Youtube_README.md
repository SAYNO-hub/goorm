# 🎬 YouTube 목업 웹 서비스 기획 및 개발 문서

## 1. 🎯 프로젝트 개요

- **프로젝트명**: YouTube Web Mockup
- **목적**: HTML/CSS를 활용해 유튜브 메인 페이지 UI를 모방하며 웹 프론트엔드의 기본 구조와 스타일링 기초를 익히기 위함
- **기술 스택**: HTML5, CSS3
- **주요 학습 목표**:
  - 시멘틱한 HTML 구조 이해
  - CSS 레이아웃 시스템 학습 (Flex, Grid)
  - 컴포넌트 분리 및 재사용 설계
  - 반응형 디자인 설계
- **개발자** : 오세인 
- **개발 기간** : 2025.06.11 ~ 2025.06.22 


---


## 2. 🧱 폴더 구조 및 주요 파일 설명

```
project/
├── index.html # 메인 HTML
├── styles/
│   ├── general.css # 공통 스타일 및 배경, 폰트
│   ├── header.css # 헤더 UI 스타일 (상단바)
│   ├── main.css # 사이드바 스타일 (좌측 메뉴)
│   └── side.css # 비디오 카드 스타일
├── assets/
│   ├── icons/ # 아이콘 이미지(svg)
│   └── images/
|        ├── thumbnails/ # 비디오 썸네일
|        └── avatars/ # 프로필 이미지
```


---


## 3. 🖼️ 주요 UI 구성 및 동작

### 3.1 헤더 (Header)
- **위치**: 최상단 - 고정 상단바 (`position: fixed`)
- **구성 요소**:
  - 좌측 : 햄버거 메뉴 (`hamburger-menu.svg`), 유튜브 로고 (`youtube-logo.svg`)
  - 중앙 : 검색창 (`input.search-bar`), 검색 버튼 + 음성 검색 버튼 (`search.svg`, `voice-search-icon.svg`)
  - 우측 : 업로드, 앱, 알림, 프로필 이미지
  - `.tooltip`은 `hover` 시 표시되며 `opacity transition` 적용됨


### 3.2 사이드바 (Sidebar)
- **위치**: 고정 좌측 메뉴 (`position: fixed`)
- **메뉴 항목**:
  - Home, Explore, Subscriptions, Originals, YouTube Music, Library
- **형태**: 
  - 각 버튼은 아이콘 + 텍스트 조합
  - `hover` 시 배경 컬러 변경 (`#4D4D4D`)
  - 화면 폭이 줄어들어도 고정됨


### 3.3 메인 컨텐츠 (Main)
- **기능**: 비디오 카드 그리드 레이아웃
- **요소 설명**:
  - `.video-preview`: 비디오 카드 하나
    - 썸네일 + 채널 프로필 + 정보(제목, 작성자, 조회수 및 업로드 날짜 : title, author, stats)
    - 영상 길이 - 썸네일 우측 하단에 `.video-time` 표시 (`position: absolute`)
  - `.video-grid`: 반응형 그리드로 여러 카드 나열
    - `.video-info-grid`는 `grid-template-columns: 50px 1fr`로 정렬


---


## 4. 📱 반응형 디자인
- **미디어 쿼리 기준**:
  - `< 750px` : 2열
  - `751px ~ 999px`: 3열
  - `1000px 이상`: 4열
- `.video-grid`에 `grid-template-columns`가 화면 폭에 따라 동적으로 적용됨
- 모바일 최적화 구조는 기본 구현 완료


---


## 5. 🎨 디자인 특성

| 요소 | 스타일 |
|------|--------|
| 전체 배경 | `#181818` (다크모드 UI 기준) |
| 헤더/사이드바 | `#212121` 배경, 테두리 색 `#4D4D4D` |
| 폰트 | Roboto, Arial |
| 텍스트 색 | 기본 흰색, 보조 정보는 `#AAAAAA` |
| 썸네일 오버레이 | `.video-time`은 검정 배경 + 흰 글씨 |


---


## 6. 🛠️ 향후 개선 및 기능 계획

| 우선순위 | 내용 |
|----------|------|
| 🔹 상 | JS 기반 비디오 카드 데이터 반복 렌더링 (JSON 또는 배열 기반) |
| 🔹 상 | 햄버거 버튼 클릭 시 사이드바 열기/닫기 (Toggle 기능) |
| 🔸 중 | 검색 버튼 동작: 입력값 받아 `alert` 또는 필터 기능 연결 |
| 🔸 중 | `localStorage` 기반 다크모드/라이트모드 전환 버튼 |
| 🔸 하 | 모바일 전용 메뉴 버튼 UI 개선 |
| 🔸 하 | 로그인 여부에 따라 우측 아이콘 구조 변경 가능성 고려 |


---


## 7. 💡 구현 중 포인트 요약

- `.tooltip`의 `opacity`와 `transition`을 사용한 부드러운 마우스 호버 인터랙션 구현
- Grid 및 Flexbox를 적절히 분리 사용하여 레이아웃 효율화
- 중복되는 `.video-preview`를 구성 요소화하는 리팩토링 여지 존재
- CSS 구조가 분리되어 있어 확장 및 유지보수 용이


---


## 8. 📎 참고 사항
- 본 프로젝트는 **학습용 클론 사이트**로 제작되었으며, 상업적 목적이 아님
- 디자인은 실제 YouTube를 참고하되, 직접 작성한 CSS와 HTML로 구현 및 창의적 수정 포함
- 향후 JavaScript와 연동하여 기능을 추가해볼 수 있음

---

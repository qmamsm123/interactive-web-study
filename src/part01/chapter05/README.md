## Cursor

CSS cursor에는 다양한 속성이 있습니다.

기본 제공되는 커서의 모양은 브라우저마다 다릅니다.

기본 제공되는 종류의 커서 모양 외에도 `url` 속성을 사용하면 커스텀 커서를 이용할 수 있습니다.

## 더 부드러운 애니메이션

자바스크립트에서 이벤트 기반 애니메이션은 성능상 한계가 있다.

[Request Animation Frame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)을 사용하면 정말 부드럽게 할 수 있다.

## Set Interval

JS native 함수다.

unique한 ID를 반환한다.

`clearInterval`에 그 ID를 넣어주면 동작을 멈추게 할 수 있다.

엄밀한 시간 정확도를 보장하지 않는다.

## Set Timeout

일정 시간 이후에 딱 한 번 실행되는 동작을 정의할 수 있다.

`clearTimeout`으로 예정된 동작을 취소할 수 있다.

## IntersectionObserver API

요소가 유저의 뷰포트에 보이는지 판단해주는 API다.

성능 최적화를 위한 지연로딩\(Lazy Loading\) 등에 이용된다.

무한 스크롤링\(Infinite Scrolling\)에서도 쓰이기도 한다.

```javascript
let observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      //요소가 50% 이상 보일 때 행하는 동작
    }
  });
}, { threshold: 0.5 });

let element = document.querySelector("#my-element");
observer.observe(element);
```

```javascript
let observer = new IntersectionObserver((entries) => {
  entries.forEach((entry)=> {
    entry.boundingClientRect // 관찰된 요소의 뷰포트 내 위치와 크기
    entry.intersectionRatio // 관찰된 요소의 총 교차(화면노출) 비율
    entry.intersectionRect // 뷰포트 내 교차된 영역의 위치와 크기
    entry.isIntersecting // 뷰포트와 현재 교차되고 있는지를 나타내는 boolean
    entry.rootBounds // root 요소의 위치와 크기
    entry.target // 관찰되고 있는 대상 DOM 요소
    entry.time // 교차가 마지막으로 확인된 시간
  });
}, { threshold: 0.5 });
```

자세한 이야기는 [공식 문서](https://developer.mozilla.org/ko/docs/Web/API/Intersection_Observer_API) 참고.


<script>
  import {
    currentChapterIndex,
    goToChapter,
    isMovingChapters,
    restart,
  } from "../../chapterStore";
  import {
    bottomNavHeight,
    topHeaderHeight,
  } from "../../percentagePositionsStore";
  import { cubicIn, cubicOut } from "svelte/easing";
  import { fly } from "svelte/transition";

  import { book } from "../../bookStore";
  import { isHoverBottomNav, isHoverTopHeader } from "../../hoverStore";
  import {
    currentBookPercentage,
    currentChapterPercentage,
  } from "../../tempStore";

  import logos from "../../assets/logos.png";
  import { hasLostEyeContact } from "../../activenessStore";
  import { isMouseInWindow } from "../../positionStore";

  let timer;

  function handleMouseEnter() {
    console.log("handleMouseEnter");
    timer = setTimeout(() => {
      restart();
      clearTimer();
    }, 2900);
  }
  function clearTimer() {
    clearTimeout(timer);
  }
</script>

{#if !$isHoverTopHeader && !$hasLostEyeContact && !$isHoverBottomNav}
  <div
    class="top-eye"
    in:fly={{
      y: 0,
      duration: 1000,
      opacity: 0,
      easing: cubicOut,
      delay: 1300,
    }}
    out:fly={{ y: 0, duration: 200, opacity: 0, easing: cubicIn, delay: 0 }}
  >
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.33339 16C1.33339 16 6.66672 5.33337 16.0001 5.33337C25.3334 5.33337 30.6667 16 30.6667 16C30.6667 16 25.3334 26.6667 16.0001 26.6667C6.66672 26.6667 1.33339 16 1.33339 16Z"
        stroke="#989898"
        stroke-width="2.66667"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M16 20C18.2091 20 20 18.2091 20 16C20 13.7909 18.2091 12 16 12C13.7909 12 12 13.7909 12 16C12 18.2091 13.7909 20 16 20Z"
        stroke="#989898"
        stroke-width="2.66667"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </div>
{/if}

{#if ($isHoverTopHeader && !$isMovingChapters && !$hasLostEyeContact && $isMouseInWindow) || false}
  <!-- style="height:{$topHeaderHeight}%;" -->
  <div
    class="top-header"
    in:fly={{
      y: -420,
      duration: 700,
      opacity: 1,
      easing: cubicOut,
      delay: 200,
    }}
    out:fly={{ y: -420, duration: 700, opacity: 1, easing: cubicIn, delay: 0 }}
  >
    <div class="flex">
      <div class="right">
        <div class="logo">
          <svg
            width="216"
            height="36"
            viewBox="0 0 216 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 6.44562V11.3779H8.33379C12.0755 11.3779 13.5382 13.1127 13.5382 17.4666V26.8549H19.3208V17.4666C19.3208 9.77914 15.9533 6.44562 8.33379 6.44562H0ZM0.170079 16.2761V26.8549H5.95271V15.5278L0.170079 16.2761Z"
              fill="black"
            />
            <path
              d="M42.2117 6.44562V15.2216C42.2117 19.8817 39.7626 22.3649 35.3746 22.3649C30.9866 22.3649 28.5375 19.8817 28.5375 15.2216V6.44562H22.7548V15.0515C22.7548 22.9771 27.2789 27.2971 35.3746 27.2971C43.4702 27.2971 47.9943 22.9771 47.9943 15.0515V6.44562H42.2117ZM38.2659 6.44562H32.4832V18.8273L38.2659 17.6707V6.44562Z"
              fill="black"
            />
            <path
              d="M50.8622 6.44562V11.3779H61.9173C60.6587 12.4664 59.9104 14.0991 59.9104 16.5822V26.8549H65.693V16.3781C65.693 13.0786 66.8495 11.3779 69.8089 11.3779V6.44562H50.8622Z"
              fill="black"
            />
            <path
              d="M82.4811 6.44562H73.535V26.8549H79.3176V11.3779H82.4811C86.0527 11.3779 87.5834 13.0786 87.5834 16.5142V26.8549H93.366V16.5142C93.366 9.473 89.9305 6.44562 82.4811 6.44562Z"
              fill="black"
            />
            <path
              d="M138.403 6.44562V11.3779H146.737C150.479 11.3779 151.941 13.1127 151.941 17.4666V26.8549H157.724V17.4666C157.724 9.77914 154.357 6.44562 146.737 6.44562H138.403ZM138.573 16.2761V26.8549H144.356V15.5278L138.573 16.2761Z"
              fill="black"
            />
            <path
              d="M159.423 6.44562V11.3779H165.608C169.35 11.3779 170.813 13.1127 170.813 17.4666V26.8549H176.595V17.4666C176.595 9.77914 173.228 6.44562 165.608 6.44562H159.423Z"
              fill="black"
            />
            <path
              d="M186.739 6.44562H180.957V26.8549H186.739V6.44562Z"
              fill="black"
            />
            <path
              d="M209.911 6.44562V15.2216C209.911 19.8817 207.462 22.3649 203.074 22.3649C198.686 22.3649 196.236 19.8817 196.236 15.2216V6.44562H190.454V15.0515C190.454 22.9771 194.978 27.2971 203.074 27.2971C211.169 27.2971 215.693 22.9771 215.693 15.0515V6.44562H209.911ZM205.965 6.44562H200.182V18.8273L205.965 17.6707V6.44562Z"
              fill="black"
            />
            <path
              d="M114.907 0C104.702 -1.60502e-10 99.7069 4.5784 99.7069 9.53544C99.7069 16.3514 106.168 18.6406 108.985 19.242V36L115.114 35.0084V13.8842C115.114 13.8842 114.99 13.8842 114.907 13.8842C110.061 13.8842 106.168 9.61523 106.168 9.61523C106.168 9.61523 110.103 5.34623 114.907 5.34623C119.711 5.34623 123.645 9.61523 123.645 9.61523C123.645 9.61523 122.113 11.2909 119.794 12.5676V34.2424L125.923 33.1388V6.46335C125.923 6.46335 129.139 6.46335 131.428 6.46335L132.409 0L116.566 0H114.907Z"
              fill="#0000FF"
            />
            <path
              d="M118.02 9.484C118.02 11.1095 116.703 12.4273 115.077 12.4273C113.451 12.4273 112.134 11.1095 112.134 9.484C112.134 7.85848 113.451 6.54074 115.077 6.54074C116.703 6.54074 118.02 7.85848 118.02 9.484ZM114.144 9.484C114.144 9.99952 114.561 10.4174 115.077 10.4174C115.593 10.4174 116.01 9.99952 116.01 9.484C116.01 8.96848 115.593 8.55057 115.077 8.55057C114.561 8.55057 114.144 8.96848 114.144 9.484Z"
              fill="black"
            />
          </svg>
        </div>
        <div class="text">
          <strong
            >פרויקט זה הינו עבודת מחקר מתמשכת בנושא קריאות, טכנולוגיה, עיצוב
            ודפוס.</strong
          >
          עוצב ע״י <span class="blue">אלעד מדן</span> במסגרת התוכנית לתואר השני
          בתקשורת חזותית בבצלאל |
          <span class="nowrap">תוכנת ע״י אלרון בוקאי.</span>
        </div>
        <div class="bottom">
          קראת <span class="blue">{Math.ceil($currentBookPercentage)}%</span> מהטקסט
        </div>
      </div>
      <button
        on:mouseenter={() => handleMouseEnter()}
        on:mouseleave={clearTimer}
        on:click={restart}
        class="restart"
      >
        איתחול

        <div class="spinner">
          <svg
            width="31"
            height="31"
            viewBox="0 0 31 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.8528 21.367C20.7276 21.4732 20.6245 21.6031 20.5495 21.7491C20.4745 21.8952 20.429 22.0545 20.4156 22.2182C20.3885 22.5487 20.4938 22.8764 20.7084 23.1292C20.9229 23.382 21.2291 23.5393 21.5595 23.5664C21.89 23.5935 22.2177 23.4882 22.4706 23.2736C23.0359 22.7974 23.5518 22.2654 24.0104 21.6856C25.4225 19.8664 26.213 17.6418 26.2655 15.3395C26.318 13.0371 25.6298 10.7788 24.3022 8.89704C22.9746 7.0153 21.0778 5.60965 18.8911 4.8871C16.7045 4.16456 14.3436 4.16332 12.1562 4.88358C9.96878 5.60383 8.07049 7.00751 6.74091 8.88785C5.41133 10.7682 4.72074 13.0258 4.77085 15.3282C4.82096 17.6306 5.60913 19.856 7.01927 21.6768C8.42941 23.4975 10.387 24.8172 12.6036 25.4416C12.6568 25.457 12.703 25.4903 12.7344 25.5358C12.7658 25.5814 12.7806 25.6364 12.7761 25.6915L12.7324 26.9289C12.7261 27.1189 12.774 27.3067 12.8706 27.4705C12.9672 27.6342 13.1085 27.767 13.2779 27.8533C13.4514 27.9384 13.6458 27.9715 13.8377 27.9484C14.0296 27.9254 14.2107 27.8472 14.3591 27.7234L17.4984 25.1029L17.6282 24.9378C17.7461 24.7868 17.8182 24.6051 17.8359 24.4143C17.8567 24.167 17.7893 23.9202 17.6454 23.7179L14.766 20.2607C14.6347 20.1112 14.4618 20.0042 14.2694 19.9536C14.077 19.9029 13.8739 19.9107 13.686 19.9761C13.4981 20.0415 13.3339 20.1615 13.2146 20.3207C13.0952 20.4798 13.0261 20.671 13.0159 20.8697L12.956 22.5648C12.9488 22.6024 12.9327 22.6377 12.9091 22.6678C12.8854 22.6979 12.8549 22.7219 12.8201 22.7378C12.7886 22.7622 12.7511 22.7776 12.7115 22.7824C12.672 22.7871 12.6319 22.781 12.5955 22.7648C10.9028 22.1174 9.46997 20.9312 8.51789 19.3891C7.56582 17.8471 7.14732 16.0347 7.3269 14.2313C7.50648 12.428 8.27416 10.7337 9.51163 9.40968C10.7491 8.08566 12.3877 7.20536 14.1748 6.90446C15.962 6.60356 17.7984 6.89876 19.4013 7.74457C21.0041 8.59038 22.2842 9.93985 23.0444 11.585C23.8046 13.2301 24.0027 15.0796 23.608 16.8484C23.2134 18.6172 22.248 20.2072 20.8606 21.3732L20.8528 21.367Z"
              fill="#0000FF"
            />
          </svg>
        </div>

        מחדש
      </button>
      <div class="left">
        <div class="logo">
          <img src={logos} alt="" />
        </div>
        <div class="text">
          <strong>תודות עמוקות ל:</strong>
          אמא שלי פנינה ולמשפחת מדן, יהלי שמלא ולחבורת החביבות, חברת סיבו, אסף גורל,
          רועי עמית, <span class="nowrap">דניאל גרומר</span>, גיא שגיא, שרי
          ארנון, אהד זהבי, ליאת לביא, <span class="nowrap">אלון סיון</span>,
          ליאת סגל, רוני גינוסר, גלעד דרוזדוב ובלינק.ai |
          <span class="blue">לזכרו של אבי, יואב מדן ז״ל.</span>
        </div>
        <div class="bottom">
          <strong>נבנה בעזרת:</strong> useanimations.com | svelte.js | talon voice
        </div>
      </div>
    </div>
    <div class="line">
      <div class="fill" style="width: {$currentBookPercentage}%" />
    </div>
  </div>
{/if}

<style lang="scss">
  .top-eye {
    position: absolute;
    top: 3.5vh;
    left: 50%;
    svg {
      width: 3.3vh;
      height: auto;
      transform: translateX(-50%);
    }
  }
  .top-header {
    position: absolute;
    width: 100%;
    height: 30%;
    top: 0;
    box-shadow: 0 0 0.2em rgba(0, 0, 0, 0.2), 0 0 1.5em rgba(0, 0, 0, 0.2);
    color: #747474;
    background-color: white;

    .right,
    .left {
      width: 26em;
      font-size: 1.8vh;
      .logo {
        height: 10vh;
        svg {
          height: 3.8vh;
          margin-top: 1.5vh;
          width: auto;
        }
      }
      .text {
        /* margin: auto 0; */
      }
      .bottom {
        margin-top: auto;
      }
    }
    .right {
      width: 23em;
      .bottom {
        font-size: 1.15em;
      }
    }
    .left {
      text-align: end;
      .logo {
        img {
          height: 3.6vh;
          margin-top: 2vh;
          width: auto;
        }
      }
      .bottom {
        font-size: 0.8em;
      }
    }

    button.restart {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      font-family: var(--narkiss-block);
      font-variation-settings: "wght" 600;
      color: var(--blue);
      border: none;
      background: none;
      padding: 3em 4em;
      font-size: 1.9vh;
      cursor: pointer;
      .spinner {
        transition: transform 1000ms ease;
        height: auto;
        line-height: 0;
        svg {
          border-radius: 100%;
          border: 0.06em solid var(--blue);
          padding: 0.08em;
          font-size: 2em;
          width: 1em;
          height: 1em;
          box-sizing: border-box;
          margin: 0.23em;
          /* will-change: transform; */
        }
      }
      &:hover {
        .spinner {
          transform: scale(1.2);
          svg {
            animation: rotateMe 2900ms ease;
            @keyframes rotateMe {
              0% {
              }
              100% {
                transform: rotate(-360deg);
              }
            }
          }
        }
      }
    }

    strong {
      font-variation-settings: "wght" 700;
    }

    .blue {
      color: var(--blue);
    }

    .nowrap {
      white-space: nowrap;
    }

    .line {
      position: relative;
      height: 0.2vh;
      &:before,
      .fill,
      .fill2 {
        transition: all 700ms ease;
      }
      &:before {
        /* background-color: var(--progressbar-color); */
        height: 100%;
        content: "";
        display: block;
        position: absolute;
        width: 100%;
      }
      .fill {
        background-color: var(--blue);
        height: 100%;
        position: absolute;
        width: 100%;
      }
    }
    .flex {
      padding: 1.5vh 2vw 1.5vw;
      box-sizing: border-box;
      margin: 0 auto;
      display: flex;
      height: 100%;
      align-items: center;
      justify-content: space-between;
      gap: 2em;
      > div {
        display: inline-flex;
        flex-direction: column;
        height: 100%;
        font-family: var(--narkiss-block);
        justify-content: center;
        cursor: pointer;
        span {
          transition: transform 700ms ease;
        }
        .number {
          font-variation-settings: "wght" 700;
          font-size: 2.2vh;

          padding-bottom: 0.35em;

          overflow: hidden;
          color: var(--blue);
          span {
            transform: translateY(2em);
          }
        }
        .title {
          font-variation-settings: "wght" 400;
          font-size: 1.93vh;
          overflow: hidden;
          padding-top: 0.3em;
          color: var(--blue);
          span {
            transform: translateY(-2em);
          }
        }
        &.active {
          /* .line {
            background-color: var(--blue);
          } */
          .title {
            font-variation-settings: "wght" 465;
          }
        }
      }
    }
  }
</style>

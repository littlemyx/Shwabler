<template>
  <v-layout align-center justify-center column fill-height class="pageWrapper">
    <div class="logoWrapper">
      <svg width="200" height="99">
        
        <g
          id="SvgjsG2492"
          featurekey="text1"
          fill="#e94191"
          transform="matrix(3.2915977748313208,0,0,3.2915977748313208,-1.9749583509875668,-15.674463271506752)"
        >
          <path
            d="M0.6 19.12 l2.02 0 c0.04 2.58 0.24 3.08 0.96 3.08 c0.98 0 0.98 -0.82 0.98 -3 c0 -3.2 -3.96 -2.34 -3.96 -6.6 c0 -2.5 0 -4.8 3 -4.8 c2.22 0 2.82 1.26 2.96 4.28 l-2 0 c-0.08 -2.18 -0.32 -2.68 -0.96 -2.68 c-0.98 0 -0.98 1.08 -0.98 3.2 c0 3.1 3.98 2 3.98 6.6 c0 2.8 0 5 -3.02 5 c-2.32 0 -2.86 -1.38 -2.98 -5.08 z M8.2 24 l0 -16 l2 0 l0 6.8 l2 0 l0 -6.8 l2 0 l0 16 l-2 0 l0 -7.6 l-2 0 l0 7.6 l-2 0 z M15.799999999999999 8 l2.1 0 l0.6 12.04 l0.2 0 l1.2 -12.04 l1.7 0 l1.2 12.04 l0.2 0 l0.6 -12.04 l2.1 0 l-1.4 16 l-2.4 0 l-1.14 -8.36 l-1.16 8.36 l-2.4 0 z M27.299999999999997 24 l0 -8.4 c0 -5.58 0 -7.78 3 -7.78 s3 2.2 3 7.78 l0 8.4 l-2 0 l0 -4.6 l-2 0 l0 4.6 l-2 0 z M29.299999999999997 17.8 l2 0 l0 -2.2 c0 -5.2 0 -6.18 -1 -6.18 s-1 0.98 -1 6.18 l0 2.2 z M35.3 24 l0 -16 l3.04 0 c2.06 0 2.74 1.28 2.74 3.58 l0 0.42 c0 1.38 -0.32 2.46 -0.68 3.24 l0 0.08 c0.74 0.62 1.2 1.84 1.3 3.96 l0 0.64 c-0.16 2.82 -0.9 4.08 -2.96 4.08 l-3.44 0 z M37.3 14.8 l1.04 0 c0.56 0 0.96 -0.66 0.96 -2.8 l0 -0.42 c0 -1.54 -0.36 -1.98 -0.96 -1.98 l-1.04 0 l0 5.2 z M37.3 22 l1.44 0 c0.6 0 1.02 -0.5 1.1 -2.08 l0 -0.64 c-0.08 -2.38 -0.5 -2.88 -1.1 -2.88 l-1.44 0 l0 5.6 z M43.099999999999994 24 l0 -16 l2 0 l0 14 l2.6 0 l0 2 l-4.6 0 z M48.89999999999999 24 l0 -16 l4.6 0 l0 1.6 l-2.6 0 l0 5.2 l2.2 0 l0 1.6 l-2.2 0 l0 5.6 l2.6 0 l0 2 l-4.6 0 z M54.89999999999999 24 l0 -16 l3.24 0 c2.06 0 2.76 1.26 2.76 3.68 c0 2.18 -0.26 3.42 -0.88 4.02 l0 0.12 c0.52 0.18 0.68 1.12 0.88 3.46 l0.4 4.72 l-2 0 l-0.26 -4.72 c-0.14 -2.38 -0.5 -2.88 -1.1 -2.88 l-1.04 0 l0 7.6 l-2 0 z M56.89999999999999 14.8 l1.24 0 c0.7 0 0.9 -0.7 0.9 -3.12 c0 -1.58 -0.3 -2.08 -0.9 -2.08 l-1.24 0 l0 5.2 z"
          />
        </g>
        
      </svg>
      <span class="beta">βeta</span>
    </div>
    <RouterLink :text="$t('enter')" color="indigo darken-3" url="login" class="enterLink"/>
    <p class="free">{{ $t('free_fish') }}</p>
    <div class="arrowWrapper" @click="arrowClickHandler">
      <p class="moreInfo">{{ $t('more_info') }}</p>
      <v-icon class="arrow" x-large light >chevron_right</v-icon>
    </div>
  </v-layout>
</template>

<script>
import RouterLink from "../components/RouterLink"

export default {
  components: {
    RouterLink
  },
  methods: {
    arrowClickHandler() {
      this.$parent.synteticScrollHandler("down") //bad practice
    }
  },
  middleware: "index",
  layout: "centerLayout"
}
</script>

<style scoped>
.pageWrapper {
  position: relative;
}

.logoWrapper {
  position: relative;
}

.beta {
  position: absolute;
  top: 0;
  right: -26px;
}

.enterLink {
  font-size: 28px;
  margin-top: 15px;
  line-height: 1;
}

.free {
  color: #9c9c9c;
  margin: 0;
}

.moreInfo {
  color: #9c9c9c;
  margin: 0;
}

.arrow {
  transform: rotate(90deg);
  animation: bounce 3s infinite linear;
}

.arrowWrapper {
  display: flex;
  flex-direction: column;
  cursor: pointer;
  position: absolute;
  bottom: 10%;
  transition: transform 0.04s linear;
}

.arrowWrapper:hover .arrow {
  animation: none;
  transform: rotate(90deg) scale(1.2);
}

@keyframes bounce {
  0% {
    transform: rotate(90deg) scale(1);
  }

  60% {
    transform: rotate(90deg) scale(1);
  }

  70% {
    transform: rotate(90deg) scale(1.2);
  }

  80% {
    transform: rotate(90deg) scale(1);
  }

  90% {
    transform: rotate(90deg) scale(1.2);
  }

  100% {
    transform: rotate(90deg) scale(1);
  }
}
</style>

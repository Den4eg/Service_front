<template>
  <transition :name="side">
    <div class="tooltip" :class="side" v-if="visibility" :key="side">
      <span class="tooltip-span">
        <slot></slot>
      </span>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      visibility: false
    };
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    timeout: {
      type: [String, Number],
      default: 0
    },
    top: {
      type: Boolean,
      default: false
    },
    bottom: {
      type: Boolean,
      default: false
    },
    right: {
      type: Boolean,
      default: false
    },
    rightbottom: {
      type: Boolean,
      default: false
    },
    left: {
      type: Boolean,
      default: false
    },
    leftbottom: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    visible: function() {
      if (this.timeout) {
        this.visibility = this.visible;
        this.changeVisibility(+this.timeout);
      } else {
        this.visibility = this.visible;
      }
    }
  },
  computed: {
    side() {
      if (this.top) {
        return "top";
      } else if (this.bottom) {
        return "bottom";
      } else if (this.right) {
        return "right";
      } else if (this.left) {
        return "left";
      } else if (this.leftbottom) {
        return "rightbottom";
      } else if (this.rightbottom) {
        return "rightbottom";
      } else {
        if (this.visible) {
          console.warn('None required attribute "position" for tooltip');
        }
        return "none";
      }
    }
  },
  methods: {
    changeVisibility(time) {
      let timeout = setTimeout(() => {
        this.$emit("hideTooltip");
        clearTimeout(timeout);
      }, time + 500);
    }
  }
};
</script>

<style scoped>
/* Tooltip */
.none {
  display: none;
}
.tooltip {
  position: absolute;
  max-width: 150px;
  padding: 10px 15px 10px 15px;
  background: #000000ef;
  color: #08aef1;
  line-height: 18px;
  font-weight: 700;
  font-size: 16px;
  border-radius: 10px;
  z-index: 1000;
  pointer-events: none;
}

.left {
  right: calc(100% + 8px);
  bottom: -2px;
}

.leftbottom {
  right: calc(100% + 8px);
  top: -2px;
}

.right {
  bottom: -2px;
  left: calc(100% + 8px);
}

.rightbottom {
  top: -2px;
  left: calc(100% + 8px);
}

.top {
  bottom: calc(100% + 8px);
  left: 0;
}

.bottom {
  left: 0;
  top: calc(100% + 8px);
}

.left:before {
  content: "";
  position: absolute;
  right: -15px;
  bottom: 8px;
  border-left: 10px solid #000000ef;
  border-right: 10px solid transparent;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
}

.leftbottom:before {
  content: "";
  position: absolute;
  right: -15px;
  top: 12px;
  border-left: 10px solid #000000ef;
  border-right: 10px solid transparent;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
}

.right:before {
  content: "";
  position: absolute;
  left: -12px;
  bottom: 8px;
  border-left: 6px solid transparent;
  border-right: 6px solid #000000ef;
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  z-index: 999;
}

.rightbottom::before {
  content: "";
  position: absolute;
  left: -12px;
  top: 12px;
  border-left: 6px solid transparent;
  border-right: 6px solid #000000ef;
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  z-index: 999;
}

.top:before {
  content: "";
  position: absolute;
  bottom: -17px;
  left: calc(41%);
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-top: 10px solid #000000de;
}

.bottom:before {
  content: "";
  position: absolute;
  top: -9px;
  border-left: 10px solid #000000de;
  border-right: 10px solid transparent;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
}

/* 
          TOP
 */

.top-enter-active,
.top-leave-active {
  transform: translateY(-20px);
  transition: all 0.4s ease;
}

.top-enter-to,
.top-leave {
  transform: translateY(0px);
  opacity: 1;
}
.top-enter,
.top-leave-to {
  opacity: 0;
}
/* 
          TOP
 */

/* 
          BOTTOM
 */

.bottom-enter-active,
.bottom-leave-active {
  transform: translateY(20px);
  transition: all 0.4s ease;
}

.bottom-enter-to,
.bottom-leave {
  transform: translateY(0px);
  opacity: 1;
}
.bottom-enter,
.bottom-leave-to {
  opacity: 0;
}
/* 
          BOTTOM
 */

/* 
          LEFT
  */
.left-enter-active,
.left-leave-active {
  transform: translateX(-20px);
  transition: all 0.4s ease;
}

.left-enter-to,
.left-leave {
  transform: translateX(0px);
  opacity: 1;
}
.left-enter,
.left-leave-to {
  opacity: 0;
}

.leftbottom-enter-active,
.leftbottom-leave-active {
  transform: translateX(-20px);
  transition: all 0.4s ease;
}

.leftbottom-enter-to,
.leftbottom-leave {
  transform: translateX(0px);
  opacity: 1;
}
.leftbottom-enter,
.leftbottom-leave-to {
  opacity: 0;
}
/* 
          LEFT
  */

/* 
          RIGHT
  */
.right-enter-active,
.right-leave-active {
  transform: translateX(20px);
  transition: all 0.4s ease;
}

.right-enter-to,
.right-leave {
  transform: translateX(0px);
  opacity: 1;
}
.right-enter,
.right-leave-to {
  opacity: 0;
}

.rightbottom-enter-active,
.rightbottom-leave-active {
  transform: translateX(20px);
  transition: all 0.4s ease;
}

.rightbottom-enter-to,
.rightbottom-leave {
  transform: translateX(0px);
  opacity: 1;
}
.rightbottom-enter,
.rightbottom-leave-to {
  opacity: 0;
}
/* 
          RIGHT
  */
</style>
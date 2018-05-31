<template>

    <div class="progress-bar">
        <div class="progress"
             :style="progressStyle"></div>
    </div>

</template>

<script>
export default {
    name: 'vue-timed-progress-bar',
    data() {
        return {
            lastTime: 0,
            lastProgress: this.value,
            elapsedTime: 0
        }
    },
    props: {
        active: {
            type: Boolean,
            default: true
        },
        hours: {
            type: [Number, String],
            default: 0
        },
        loop: {
            type: Boolean,
            default: false
        },
        milliseconds: {
            type: [Number, String],
            default: 0
        },
        minutes: {
            type: [Number, String],
            default: 0
        },
        seconds: {
            type: [Number, String],
            default: 10
        },
        rfc: {
            type: Boolean,
            default: true
        },
        value: {
            type: Number,
            default: 0,
            validator(value) {
                return value >= 0 && value <= 100
            }
        }
    },
    computed: {
        timer() {
            return (
                +this.milliseconds +
                +this.seconds * 1000 +
                +this.minutes * 1000 * 60 +
                +this.hours * 1000 * 60 * 60
            )
        },
        progressStyle() {
            return {
                width: `${this.value}%`
            }
        },
        running() {
            return this.startTime !== null
        }
    },
    watch: {
        active(value) {
            if (value) {
                this.start()
            }
        }
    },
    mounted() {
        if (this.active) {
            this.start()
        }
    },
    methods: {
        start() {
            this.lastTime = Date.now()
            this.scheludeTick()
        },
        restart() {
            this.elapsedTime = 0
            this.start()
        },
        resume() {
            this.scheludeTick()
        },
        tick(timestamp) {
            // If progress was not changed by tick we recalculate elapsedTime
            if (this.value !== this.lastProgress) {
                this.elapsedTime = this.value * this.timer / 100
            } else {
                const now = Date.now()
                const delta = now - this.lastTime
                this.lastTime = now
                this.elapsedTime += delta
            }

            const complete = this.elapsedTime >= this.timer
            const progress = complete
                ? 100
                : this.elapsedTime * 100 / this.timer
            this.lastProgress = progress
            this.$emit('input', progress)

            if (complete) {
                this.$nextTick(() => {
                    this.$emit('complete')
                })

                if (this.loop) {
                    this.restart()
                }
            } else if (this.active) {
                this.scheludeTick()
            }
        },
        scheludeTick() {
            if (this.raf) {
                requestAnimationFrame(this.tick)
            } else {
                setTimeout(this.tick, 16.666666)
            }
        }
    }
}
</script>

<style scoped>
.progress-bar {
    height: 4px;
    background-color: #ea869a;
}

.progress {
    height: 100%;
    background-color: #cf2446;
}
</style>
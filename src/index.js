import Vue from 'vue'
import TimedProgressBar from './TimedProgressBar.vue'

window.vm = new Vue({
    el: '#app',
    data() {
        return {
            active: true,
            progress: 0
        }
    },
    render(h) {
        return h('div', [
            h(TimedProgressBar, {
                props: {
                    value: this.progress,
                    active: this.active
                },
                on: {
                    input: val => this.progress = val,
                    complete: () => alert('Terminado')
                }
            }),
            h('h1', this.progress + '%'),
            h('input', {
                attrs: {
                    id: 'input'
                },
                staticStyle: {
                    width: '100%'
                },
                on: {
                    change: event => this.progress = +event.target.value
                }
            }),
            h('input', {
                attrs: {
                    id: 'input',
                    type: 'checkbox'
                },
                domProps: {
                    checked: this.active
                },
                on: {
                    change: event => this.active = !!event.target.checked
                }
            })
        ])
    }
})
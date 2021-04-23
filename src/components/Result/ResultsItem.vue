<template>
    <div class="results__item">
        <div class="results__item__body">
            <div class="body-flight">
                <div class="offer-flight">
                    <div class="carrier-flight">
                        <img :src="src" alt="airline" height="20" width="20" style="margin-right: 0.5rem">
                        <span v-if="isDirect || isSame" class="small">{{carrierName}}</span>
                        <img  v-if="!isDirect && !isSame" :src="src2" alt="airline" height="20" width="20">
                    </div>
                    <div>
                        <div    class="date">{{depDate}}</div>
                        <strong class="time">{{depTime}}</strong>
                    </div>
                    <div class="flight-info">
                        <div class="flight-code">
                            <span>{{firstOriginCode}}</span>
                            <span>{{flightTime()}}</span>
                            <span>{{destinationCode}}</span>
                        </div>
                        <div class="flight-dist"></div>
                    </div>
                    <div>
                        <div    class="date">{{arrDate}}</div>
                        <strong class="time">{{arrTime}}</strong>
                    </div>
                </div>
            </div>
            <div style="margin-top: 2rem; display: flex; ">
                <button class="flight-button">Детали перелета</button>
                <button class="flight-button">Условия тарифа</button>
            </div>
        </div>
        <div class="results__item__price">
            <span class="price">{{flightPrice}}</span>
            <div  class="choose-button">Выбрать</div>
            <div  style="margin-top: 0.5rem; font-size: 0.75rem; color: #707276;">Цена за всех пассажиров</div>
            <div  style="margin-top: 0.5rem; ">{{Object.values(result.services)[0].alt_text}}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['result'],
    data() {
        return {
            route: {},
            logoUrl: 'https://aviata.kz/static/airline-logos/80x80',
            isDirect: Boolean,
            isSame: Boolean,
            src: '',
            src2: '',
            carrierName: '',
            firstOriginCode: ''
        }
    },
    methods: {
        init() {
            this.route = this.result.itineraries[0][0];
            const segments = this.route.segments
            this.isDirect = this.route.segments.length > 1 ? false : true
            // this.isSame = this.route.segments[0].carrier == this.route.segments[this.route.segments.length - 1].carrier
            this.src = `${this.logoUrl}/${this.route.segments[0].carrier}.png`
            // this.src2 = `${this.logoUrl}/${this.route.segments[1].carrier}.png`
            this.carrierName = this.route.carrier_name
            this.firstOriginCode = this.route.segments[0].origin_code
            segments.length > 1 ? this.secondOriginCode = segments[segments.length -1].origin_code : this.secondOriginCode = null
        },
        flightTime() {
            const time = this.route.traveltime;
            const days = Math.floor(time/24/60/60);
            const hoursLeft   = Math.floor((time) - (days*86400));
            const hours       = Math.floor(hoursLeft/3600);
            const minutesLeft = Math.floor((hoursLeft) - (hours*3600));
            const minutes     = Math.floor(minutesLeft/60);

            return `${days > 0  ? days + ' д' : ''} ${hours > 0 ? hours + ' ч' : ''} ${minutes > 0 ? minutes+ ' м': ''}`
        }
    },
    created() {
        this.init()
    },

    computed: {

        destinationCode() {
            const segments = this.route.segments;
            return segments[segments.length - 1].dest_code
        },
        flightPrice() {
            return this.route.price.amount + ' Т'
        },
        depDate() {
            let date = this.route.segments[0].dep_time;
            date = date.split(' ')
            return `${date[0]} ${date[1]} ${date[2].toLowerCase()}`
        },
        depTime() {
            const time = this.route.segments[0].dep_time;
            return time.split(' ').pop()
        },
        arrDate() {
            const segments = this.route.segments;
            let date = segments[segments.length - 1].arr_time;
            date = date.split(' ')
            return `${date[0]} ${date[1]} ${date[2].toLowerCase()}`
        },
        arrTime() {
            const segments = this.route.segments;
            const time = segments[segments.length - 1].arr_time;
            return time.split(' ').pop()
        },
    },
}
</script>

<style>


</style>
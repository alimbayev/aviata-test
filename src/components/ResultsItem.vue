<template>
    <div class="results__item">
        <div class="item-body">
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
                        <div class="flight-time">{{flightTime}}</div>
                        <div class="flight-dist"></div>
                        <div class="flight-code">
                            <span>{{firstOriginCode}}</span>
                            <span>{{secondOriginCode}}</span>
                            <span>{{destinationCode}}</span>
                        </div>
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
        <div class="item-price">
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
        }
    },
    created() {
        this.route = this.result.itineraries[0][0];
        this.isDirect = this.route.segments.length > 1 ? false : true
        this.isSame = this.route.segments[0].carrier == this.route.segments[this.route.segments.length - 1].carrier
    },
    computed: {
        src() {
            return `${this.logoUrl}/${this.route.segments[0].carrier}.png`
        },
        src2() {
            return `${this.logoUrl}/${this.route.segments[1].carrier}.png`
        },
        carrierName() {
            return this.route.carrier_name;
        },
        flightTime() {
            const time = this.route.traveltime;
            const days = Math.floor(time/24/60/60);
            const hoursLeft   = Math.floor((time) - (days*86400));
            const hours       = Math.floor(hoursLeft/3600);
            const minutesLeft = Math.floor((hoursLeft) - (hours*3600));
            const minutes     = Math.floor(minutesLeft/60);

            return `${days > 0  ? days + ' д' : ''} ${hours > 0 ? hours + ' ч' : ''} ${minutes > 0 ? minutes+ ' м': ''}`
        },
        firstOriginCode() {
            const segments = this.route.segments;
            return segments[0].origin_code;
        },
        secondOriginCode() {
            const segments = this.route.segments;
            if (segments.length > 1) return segments[segments.length - 1].origin_code
            return  null;
        },
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
.results__item {
    display: flex;
    width: 100%;
    background-color: #fff;
    box-shadow: 0 2px 4px rgb(0 0 0 / 15%);
    border-radius: 4px;
    margin-bottom: 1rem;
}

.item-body {
    width: 66.7%;
    min-height: 128px;
    padding: 2rem 1.5rem 1rem;
}

.item-price {
    width: 33.3%;
    background-color: #F5F5F5;
    border-bottom-right-radius: 4px;
    border-top-right-radius: 4px;
    padding: 0.75rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.body-flight {
    width: 546px;
}

.offer-flight {
    display: flex;
    width: 480px;
    height: 40px;
    justify-content: flex-start;
    margin-bottom: 0;
}

.small {
    font-size: .75rem;
}

.carrier-flight {
    display: flex;
    width: 8rem;
    align-items: center;
}

.date {
    padding-bottom: 0.25rem;
    font-size: 12px;
    font-weight: 400;
}

.time {
    font-size: 24px;
    font-weight: 600;
}
.flight-info {
    width: 12rem;
    margin: 0 auto;
}

.flight-time {
    text-align: center;
    font-size: 0.75rem;
}

.flight-dist {
    margin-top: 0.25rem;
    height: 3px;
    width: 100%;
    background-color: rgba(219,219,219, 80%);
}

.flight-code {
    display: flex;
    justify-content: space-between;
    margin-top: .5rem;
    font-size: .625rem;
}

.gray {
    color: gray;
}

.flight-button {
    display: block;
    border: none;
    border-radius: 24px;
    background-color: rgba(247,247,252, 100%);
    padding: 10px 15px;
    font-size: 12px;
    color: #7284E4;
    margin-right: 1rem;
    cursor: pointer;
    transition: all 0.2s ease-out;
}

.flight-button:hover {
    background-color: #7284e4;
    color: white;
}

.price {
    line-height: 1;
    font-size: 1.5rem;
    font-weight: 600;
}

.choose-button {
    width: 70%;
    border: 1px solid #40a61b;
    margin-top: 0.5rem;
    padding: 0.75rem 1rem;
    text-align: center;
    color: white;
    font-weight: 600;
    border-radius: 4px;
    background-color: #55bb06;
    cursor: pointer;
    transition: all 0.2s ease-out;
}

.choose-button:hover {
    background-color: #40a61b;
}

</style>
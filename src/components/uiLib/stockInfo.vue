<script setup>
import { ref, watch, watchEffect } from 'vue';
import {
  fetchCurrentPrice,
  fetchPriceHistory,
} from '@/common/BinanceService.js';
import BaseIcon from '@/components/bases/BaseIcon.vue';

const companies = [
  { id: 1, name: 'BTC' },
  { id: 2, name: 'BNB' },
  { id: 3, name: 'ETH' },
  { id: 4, name: 'SOL' },
  { id: 5, name: 'LTC' },
];

const intervals = ['5m', '1h', '4h', '12h', '1d', '3d', '1w', '1M'];

const selectedCompanyName = ref(companies[0].name);
const selectedInterval = ref(intervals[0]);
const isLoading = ref(false);
const currentPrice = ref(0);
const priceChange = ref(0);
const averagePrices = ref(0);

const loadPrice = async () => {
  isLoading.value = true;
  fetchCurrentPrice(selectedCompanyName.value).then(response => {
    currentPrice.value = parseFloat(response.prise).toFixed(2);
    priceChange.value = response.priceChangePercent;

    fetchPriceHistory(selectedCompanyName.value, selectedInterval.value).then(
      response => {
        averagePrices.value = response.map(d => {
          return ((parseFloat(d.high) + parseFloat(d.low)) / 2).toFixed(2);
        });
        isLoading.value = false;
      },
    );
  });
};

function generatePriceChartSVG(width, height, values, priceChange) {
  const padding = 5;
  // const pointRadius = 3;
  let pathD = '';
  let areaD = '';
  let circles = '';
  const gradientId = 'priceChartGradient';
  const color = priceChange > 0 ? 'green' : 'red';

  const maxValue = Math.max(...values);
  const minValue = Math.min(...values);
  const scaleX = (width - 2 * padding) / Math.max(1, values.length - 1);
  const scaleY = (height - 2 * padding) / (maxValue - minValue);

  values.forEach((value, index) => {
    const x = padding + index * scaleX;
    const y = height - padding - (value - minValue) * scaleY;

    if (index === 0) {
      pathD += `M${x},${y}`;
      areaD += `M${x},${height - padding}`;
      areaD += ` L${x},${y}`;
    } else {
      const cpX1 = (padding + (index - 1) * scaleX + x) / 2;
      const cpY1 = height - padding - (values[index - 1] - minValue) * scaleY;
      const cpX2 = cpX1;
      const cpY2 = y;

      pathD += ` C${cpX1},${cpY1} ${cpX2},${cpY2} ${x},${y}`;
      areaD += ` C${cpX1},${cpY1} ${cpX2},${cpY2} ${x},${y}`;
    }

    // circles += `<circle cx="${x}" cy="${y}" r="${pointRadius}" stroke="white" stroke-width="1" fill="${color}"/>`;
  });

  areaD += ` L${padding + (values.length - 1) * scaleX},${height - padding} Z`;

  const defs = `<defs>
    <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="40%" style="stop-color:${color}; stop-opacity: 0.3" />
      <stop offset="100%" style="stop-color:${color}; stop-opacity: 0" />
    </linearGrad0ient>
  </defs>`;

  const areaPath = `<path d="${areaD}" fill="url(#${gradientId})"/>`;

  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    ${defs}
    ${areaPath}
    <path d="${pathD}" fill="none" stroke-width="2" stroke="${color}"/>
    ${circles}
  </svg>`;
}

const chartSVG = ref(null);

watch(averagePrices, () => {
  chartSVG.value = generatePriceChartSVG(
    325,
    100,
    averagePrices.value,
    priceChange.value,
  );
});

watchEffect(() => {
  loadPrice(selectedCompanyName.value, selectedInterval.value);
});
</script>

<template>
  <div class="stock">
    <div class="stock__companies">
      <div
        v-for="company in companies"
        :key="company.id"
        class="stock__company-name"
        :class="{
          'stock__company-name_active': company.name === selectedCompanyName,
        }"
        @click="selectedCompanyName = company.name"
      >
        {{ company.name }}
      </div>
    </div>
    <div class="stock__date">
      <div
        v-for="(interval, index) in intervals"
        :key="index"
        class="stock__date-item"
        :class="{ 'stock__date-item_active': interval === selectedInterval }"
        @click="selectedInterval = interval"
      >
        {{ interval }}
      </div>
    </div>
    <div class="stock__chart-wrapper">
      <div v-show="isLoading" class="stock__loading">
        <BaseIcon name="IconLoader" />
      </div>
      <div class="stock__price">
        <span>{{ currentPrice }} $</span>
        <span
          :class="{
            'stock__price_up-price': priceChange > 0,
            'stock__price_down-price': priceChange < 0,
          }"
          >{{ `${priceChange}%` }}</span
        >
      </div>
      <div class="stock__chart" v-html="chartSVG"></div>
      <div class="stock__view-prices-wrapper">
        <div
          v-for="(price, index) in averagePrices"
          :key="index"
          class="stock__view-prices-item"
        >
          <span>{{ price }} $</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.stock {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: $background-chart;
  color: $color-text-chart;
  padding: 15px 15px 0 15px;
  border-radius: 30px;
  user-select: none;
  overflow: hidden;
  border: 4px solid $border-color-ui;

  &__companies {
    display: flex;
    justify-content: space-between;
  }

  &__company-name {
    cursor: pointer;
    padding: 5px 10px;
    font-size: 14px;
    border-radius: 20px;

    &_active {
      background: $accent-chart;
      color: #fff;
    }
  }

  &__date {
    display: flex;
    justify-content: space-between;
    margin: 0 -15px;
    padding: 7px 15px;
    border: 1px solid $color-border-chart;
    border-left: none;
    border-right: none;
  }

  &__date-item {
    cursor: pointer;
    padding: 3px 10px;
    border-radius: 20px;
    font-size: 12px;

    &_active {
      background: $accent-chart;
      color: #fff;
    }
  }

  &__chart-wrapper {
    position: relative;
    margin-left: -15px;
    margin-right: -15px;
  }

  &__price {
    position: relative;
    display: flex;
    width: max-content;
    gap: 10px;
    margin-left: 10px;
    z-index: 3;
    color: $color-price-chart;
    background: $background-price-chart;
    padding: 4px 10px;
    font-size: 11px;
    border-radius: 10px;
    margin-bottom: 5px;

    span {
      display: inline-block;
    }

    &_up-price {
      color: green;
    }

    &_down-price {
      color: red;
    }
  }

  &__chart {
    height: 100px;
    margin-left: -3px;
    margin-right: -3px;

    svg {
      margin: 5px;
    }
  }

  &__view-prices-wrapper {
    position: absolute;
    display: grid;
    grid-template-columns: repeat(25, 1fr);
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  &__view-prices-item {
    opacity: 0;
    transition: all 0.2s;
    cursor: pointer;

    span {
      display: flex;
      position: absolute;
      font-size: 11px;
      top: 25px;
      left: 10px;
      color: $color-price-chart;
      background: $background-price-chart;
      padding: 3px 8px;
      border-radius: 20px;
      white-space: nowrap;
    }

    &:hover {
      background: linear-gradient(transparent, #f3aa1c);
      opacity: 1;
    }
  }

  &__loading {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    top: 0;
    right: 9px;
    background: #000;
    border-radius: 5px;
    z-index: 3;
  }
}
</style>

<style>
.stock__chart {
  svg {
  }
}
</style>

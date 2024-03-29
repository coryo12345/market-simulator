<script setup lang="ts">
import { computed } from 'vue';
import { Time } from '../../models/time';

const props = defineProps<{
  title?: string;
  yTitle?: string;
  series: { name: string; data: number[][] }[];
}>();

const chartOptions = computed(() => ({
  chart: {
    type: 'area',
    stacked: false,
    height: 350,
    zoom: {
      type: 'x',
      enabled: true,
      autoScaleYaxis: true,
    },
    toolbar: {
      autoSelected: 'zoom',
    },
  },
  stroke: {
    curve: 'straight',
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 0,
  },
  title: {
    text: props.title ?? '',
    align: 'left',
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      inverseColors: false,
      opacityFrom: 0,
      opacityTo: 0,
      stops: [0, 90, 100],
    },
  },
  yaxis: {
    labels: {
      formatter: function (val: number) {
        return '$' + val.toFixed(2);
      },
    },
    title: {
      text: props.yTitle ?? '',
    },
  },
  xaxis: {
    // type: 'datetime',
    labels: {
      formatter: function (val: number) {
        return new Time(val).toString();
      },
    },
  },
  tooltip: {
    shared: false,
    y: {
      formatter: function (val: number) {
        return '$' + val.toFixed(2);
      },
    },
  },
}));
</script>

<template>
  <div>
    <apexchart
      type="area"
      height="350"
      :options="chartOptions"
      :series="props.series"
    ></apexchart>
  </div>
</template>

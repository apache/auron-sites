<template>
  <v-chart class="chart" :option="option" />
</template>

<script setup>
import "echarts";
import VChart from "vue-echarts";
import { ref, onMounted, onUnmounted } from "vue";
import { sparkResults, blazeResults } from "../../../benchmark-result/benchmark-result.ts";

function parseCaseNames(resultStr) {
  return resultStr.split(/\s+/).filter(s => s.startsWith('q'));
}

function parseResultValues(resultStr) {
  return resultStr.split(/\s+/).filter(s => s.match(/\d+(\.\d+)/)).slice(0, -1);
}

const caseNames = parseCaseNames(sparkResults);
const sparkResultValues = parseResultValues(sparkResults);
const blazeResultValues = parseResultValues(blazeResults);

// Responsive configuration based on screen size
const getResponsiveConfig = () => {
  const width = window.innerWidth;
  
  if (width <= 480) {
    // Mobile devices
    return {
      fontSize: 8,
      barWidth: 1,
      gridLeft: '5%',
      gridRight: '5%',
      gridBottom: '15%'
    };
  } else if (width <= 768) {
    // Tablets
    return {
      fontSize: 9,
      barWidth: 1.5,
      gridLeft: '3%',
      gridRight: '5%',
      gridBottom: '10%'
    };
  } else if (width <= 1024) {
    // Small desktops
    return {
      fontSize: 10,
      barWidth: 2,
      gridLeft: '2%',
      gridRight: '5%',
      gridBottom: '8%'
    };
  } else {
    // Large screens
    return {
      fontSize: 10,
      barWidth: 2,
      gridLeft: '0%',
      gridRight: '5%',
      gridBottom: '5%'
    };
  }
};

const updateChartOption = () => {
  const config = getResponsiveConfig();
  
  option.value = {
    toolbox: {
      feature: {
        saveAsImage: {
          show: true,
        }
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      textStyle: {
        fontSize: config.fontSize
      }
    },
    grid: {
      left: config.gridLeft,
      right: config.gridRight,
      bottom: config.gridBottom,
      containLabel: true
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        textStyle: {
          fontSize: config.fontSize
        }
      }
    },
    xAxis: {
      type: 'category',
      data: caseNames,
      axisLabel: {
        textStyle: {
          fontSize: config.fontSize
        },
        rotate: window.innerWidth <= 768 ? 45 : 0 // Rotate labels on mobile/tablet
      }
    },
    series: [
      {
        name: 'Spark-3.5.6',
        type: 'bar',
        barWidth: config.barWidth,
        data: sparkResultValues,
        markLine: {
          data: [{ type: 'average', name: 'Average' }],
        },
      }, {
        name: 'Auron-6.0.0-preview (dc8d7a9)',
        type: 'bar',
        barWidth: config.barWidth,
        data: blazeResultValues,
        markLine: {
          data: [{ type: 'average', name: 'Average' }],
        },
      }
    ]
  };
};

const option = ref({});

// Initialize chart option
updateChartOption();

// Handle window resize
const handleResize = () => {
  updateChartOption();
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

</script>

<style scoped>
.chart {
  height: 600px;
  width: 100%;
  min-height: 300px; /* Ensure minimum height for readability */
}

/* Responsive chart heights */
@media (max-width: 480px) {
  .chart {
    height: 400px;
  }
}

@media (max-width: 768px) {
  .chart {
    height: 500px;
  }
}

@media (max-width: 1024px) {
  .chart {
    height: 550px;
  }
}
</style>

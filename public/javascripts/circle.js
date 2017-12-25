var myChart = echarts.init(document.getElementById('main'));

myChart.title = '环形图';

			var a = parseInt($("#a").text());
			var b = parseInt($("#b").text());
			var c = parseInt($("#c").text());
			
			var rateA = $("#aa").text();
			var rateB = $("#bb").text();
			var rateC = $("#cc").text();
			
			a = a * rateA;
			b = b * rateB;
			c = c * rateC;


option = {
	
	title: {
		        left: 'center',
                top: 'top',
                text: '总资产价值比例环形图'
            },
			
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        x: 'left',
        data:[' A 行走积分',' B 环保积分',' C 公益积分']
    },
    series: [
        {
            name:'总资产（单位：元）',
            type:'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:[
                {value:a.toFixed(2), name:' A 行走积分'},
                {value:b.toFixed(2), name:' B 环保积分'},
                {value:c.toFixed(2), name:' C 公益积分'}

            ]
        }
    ]
};


myChart.setOption(option);



new Chartist.Line('#consumption-chart', {
    labels: ['Nov', 'Dez', 'Jan', 'Fev', 'Mar', 'Abr'],
    series: [{
        name: 'estimative',
        data: [108, 108, 108, 108, 116, 116]
    }, {
        name: 'real',
        data: [179, 160, 157, 175, 172, 167.6]
    }]
  }, {
  low: 0,
  series: {
    'estimative': {
        lineSmooth: Chartist.Interpolation.step(),
        showArea: false
    },
    'real': {
        lineSmooth: Chartist.Interpolation.simple(),
        showArea: true
    }
  }

});
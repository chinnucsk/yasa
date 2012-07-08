(function($) {
    $.dashboard = {
        init : function() {
            $.ajaxSetup({
                async: false
            });

            $.getJSON("/api/keys", function(data) {
                $.each(data, function(i, key) {
                    $("#keys").append("<li data-name='"+key+"'><a href='#'>" + key + "</a></li>");
                });
            });

            $('#keys li').click(function() {
                $.dashboard.graph( $(this).data('name') );
                return false;
            });
        },

        graph : function(key) {
            var options = {
                chart: {
                    renderTo: 'graph',
                    type: 'area'
                },
                title: {
                    text: key
                },
                xAxis: {
                    type: 'datetime'
                }
            };

            $.getJSON("/api/get?range=-5min&key="+key, function(data) {
                data = $.map(data, function(arr) { return [[arr[0] * 1000, arr[1]]] });
                console.log(data);
                
                options.series = [{name: key, data: data}];
                new Highcharts.Chart(options);
            });
        }
    }
})(jQuery);

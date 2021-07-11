$(document).ready(function () {
  $("#table_id").DataTable({
    paging: false, // hide pagination
    scrollY: 200, // fixed header
    language: {
      search: "Search in table:", // search box label
    },

    dom: "Blfrtip",
    buttons: [
      {
        extend: "csvHtml5",
        text: '<i class="fas fa-file-csv me-2"></i>CSV',
        titleAttr: "CSV",
        className: "btn-sm btn-success",
      },
      {
        extend: "excelHtml5",
        text: '<i class="fas fa-file-excel me-2"></i>EXCEL',
        titleAttr: "EXCEL",
        className: "btn-sm btn-success",
      },
    ],

    initComplete: function () {
      this.api()
        .columns()
        .every(function () {
          var column = this;
          var select = $('<select><option value=""></option></select>')
            .appendTo($(column.footer()).empty())
            .on("change", function () {
              var val = $.fn.dataTable.util.escapeRegex($(this).val());

              column.search(val ? "^" + val + "$" : "", true, false).draw();
            });

          column
            .data()
            .unique()
            .sort()
            .each(function (d, j) {
              select.append('<option value="' + d + '">' + d + "</option>");
            });
        });
    },
  });

  var table = $("#table_id").DataTable();

  // on page-load with search key-word [like: Fiona]
  table.search("Fiona").draw();

  // on page-load show the next page [like: pagination 1]
  table.page("next").draw(false);
  table.page(1).draw(false);

  // this code will call when trigger any event [like: search, sorting, pagination, change number of record]
  table.on("draw", function () {
    alert("Table redrawn");
  });
});

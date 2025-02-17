document.addEventListener("DOMContentLoaded", function () {
    const bookingForm = document.getElementById("bookingForm");

    if (bookingForm) {
        bookingForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const servicePrices = {
                "Wedding Package": 1600,
                "In-Studio Photoshoot": 350,
                "Product Photoshoot": 260
            };

            let selectedServices = [];
            let totalPrice = 0;

            if (document.getElementById("bookingWeddingPackage").checked) {
                selectedServices.push("Wedding Package");
                totalPrice += servicePrices["Wedding Package"];
            }
            if (document.getElementById("bookingStudioPhotoshoot").checked) {
                selectedServices.push("In-Studio Photoshoot");
                totalPrice += servicePrices["In-Studio Photoshoot"];
            }
            if (document.getElementById("bookingProductPhotoshoot").checked) {
                selectedServices.push("Product Photoshoot");
                totalPrice += servicePrices["Product Photoshoot"];
            }

            let bookingDate = document.getElementById("bookingDate").value;

            if (selectedServices.length === 0) {
                alert("Please select at least one service before booking.");
                return;
            }
            if (bookingDate === "") {
                alert("Please select a date and time.");
                return;
            }

            if (bookingDate.includes("T")) {
                bookingDate = bookingDate.replace("T", " ");
            }

            sessionStorage.setItem("confirmedService", selectedServices.join(", "));
            sessionStorage.setItem("confirmedDate", bookingDate);
            sessionStorage.setItem("confirmedTotal", totalPrice);

            window.location.href = "confirmed.html";
        });
    }

    if (document.getElementById("confirmedService")) {
        document.getElementById("confirmedService").innerText =
            sessionStorage.getItem("confirmedService") || "No service selected";

        document.getElementById("confirmedDate").innerText =
            sessionStorage.getItem("confirmedDate") || "No date selected";

        document.getElementById("quoteTotal").innerText =
            sessionStorage.getItem("confirmedTotal") || "0";
    }

    const printButton = document.getElementById("printInvoice");
    if (printButton) {
        printButton.addEventListener("click", function () {
            window.print();
        });
    }
});

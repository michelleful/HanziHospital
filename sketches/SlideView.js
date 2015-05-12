// Pseudo-code for slide view.

class SlideView({
    render: function(data) {
        this.renderPatientView(data.patient);
        this.renderDonorsView(data.donors);
        this.patientView.on('donation:received', function() {
            var result = this.evaluateDonation();
            this.trigger('complete', result);
        });
    },

    renderPatientView: function(patientData) {},
    renderDonorsView: function(donorsData) {},
});

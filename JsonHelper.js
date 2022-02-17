class JsonHelper {
  handleJson(data) {
    let street = "";
    let postCode = "";
    let city = "";
    let phone = "";
    let website = "";
    for (let address of data.results[0].addresses) {
      if (address.street.length && !address.endDate) {
        street = address.street;
        postCode = address.postCode;
        city = address.city;
        break;
      }
    }
    for (let contactDetails of data.results[0].contactDetails) {
      if ((
        contactDetails.type == "Puhelin" ||
        contactDetails.type == "Telefon" ||
        contactDetails.type == "Telephone" ||
        contactDetails.type == "Matkapuhelin" ||
        contactDetails.type == "Mobiltelefon" ||
        contactDetails.type == "Mobile phone"
      ) && contactDetails.value.length && !contactDetails.endDate) {
        phone = contactDetails.value;
      }
      if ((
        contactDetails.type == "Kotisivun www-osoite" ||
        contactDetails.type == "www-address" ||
        contactDetails.type == "Website address"
      ) && contactDetails.value.length && !contactDetails.endDate) {
        website = contactDetails.value;
      }

    }
    let companyObj = {
      "business_id": data.results[0].businessId,
      "name": data.results[0].name,
      "address": street+", "+postCode+" "+city,
      "phone": phone,
      "website": website
    }
    return companyObj;
  }

}

module.exports = JsonHelper;
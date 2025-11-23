async function contectForm() {
  
  let formUrl =
    "https://wordpress-1471720-5962383.cloudwaysapps.com/wp-json/flexiforms-pro/v1/forms/contect-form/config";

  const formResponse = await fetch(formUrl);

  const formData = await formResponse.json();

  return formData;
}

contectForm();

async function displayForm() {
  
  const formdisplay = await contectForm();

  console.log(formdisplay);

  const fields = formdisplay.data.fields;

  let displayFormData = "";

  fields.forEach((field) => {
    displayFormData += `
    <div class = "form-field">
    <label class="form-label" >${field.label}</label>
      <input class="form-input" type="${field.type}" name="${field.name}" />
      </div>
   
    `;
  });

  document.querySelector('.js-form-contect').innerHTML = displayFormData;
}

displayForm();

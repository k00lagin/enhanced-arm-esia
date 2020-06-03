<script>
// body[data-page="ConfirmationStatusPage"] подтверждение
// data-page="ConfirmationStatusPage" p-confirmation__title обновление паспорта
// data-page="RecoverPage"
// data-page="DeletePage"
	import { mfc, director } from '../stores.js';
	import { format } from 'date-fns';
	import { ru } from 'date-fns/locale';
  function loadFile(url, callback) {
    PizZipUtils.getBinaryContent(url, callback);
  }
  function handlePrintClick() {
    loadFile(
      "https://k00lagin.github.io/enhanced-arm-esia/template.docx",
      function(error, content) {
        if (error) {
          throw error;
        }
        function replaceErrors(key, value) {
          if (value instanceof Error) {
            return Object.getOwnPropertyNames(value).reduce(function(
              error,
              key
            ) {
              error[key] = value[key];
              return error;
            },
            {});
          }
          return value;
        }

        function errorHandler(error) {
          console.log(JSON.stringify({ error: error }, replaceErrors));

          if (error.properties && error.properties.errors instanceof Array) {
            const errorMessages = error.properties.errors
              .map(function(error) {
                return error.properties.explanation;
              })
              .join("\n");
            console.log("errorMessages", errorMessages);
          }
          throw error;
        }

        var zip = new PizZip(content);
        var doc;
        try {
          doc = new docxtemplater(zip);
        } catch (error) {
          errorHandler(error);
        }

        doc.setData({
          snils: document.querySelector("#snilsField").value,
          client_fio: `${document.querySelector("#lastNameField").value} ${
            document.querySelector("#firstNameField").value
          } ${document.querySelector("#secondNameField").value}`,
          client_fio_compact: `${
            document.querySelector("#lastNameField").value
          } ${document.querySelector("#firstNameField").value.substr(0,1)}. ${
            document.querySelector("#secondNameField").value.substr(0,1)
          }.`,
          birth_date: document.querySelector("#birthdayField").value,
          birth_place: document.querySelector("#birthplaceField").value,
          doc: `${
            document.querySelector("#documentTypeField option[selected]")
              .textContent
          } ${document.querySelector("#documentRfSeriaField").value}, выдан ${
            document.querySelector("#documentRfDateField").value
          } ${document.querySelector("#documentRfIssuedByField").value}, ${
            document.querySelector("#documentIssuerIdField").value
          }`,
          address: document.querySelector("#addressPRGField").value,
          gender: document.querySelector("#sexMaleField:checked")
            ? "Мужской"
            : "Женский",
          citizenship: document
            .querySelector("#citizenshipField option[selected]")
						.textContent.trim(),
					date: format(new Date(), 'd MMMM y',{locale: ru}),
					variant: (() => {
						switch (document.body.getAttribute('data-page')) {
							case 'RegistrationPage':
								return 'зарегистрировать новую учётную запись'
							case 'ConfirmationStatusPage':
								return 'подтвердить учётную запись'
							case 'RecoverPage':
								return 'восстановить доступ к учётной записи'
							case 'DeletePage':
								return 'удалить учётную запись'
						}
					})(),
					subvariant: (() => {
						switch (document.body.getAttribute('data-page')) {
							case 'RegistrationPage':
								return `Способ доставки пароля для первого входа в систему: ${document.querySelector("input[name=passwordMethod][value=mobile]:checked")?'на номер мобильного телефона':'на электронную почту'}`
							case 'ConfirmationStatusPage':
								return ''
							case 'RecoverPage':
								return `Способ доставки пароля для первого входа в систему: ${document.querySelector("input[name=passwordMethod][value=mobile]:checked")?'на номер мобильного телефона':'на электронную почту'}`
							case 'DeletePage':
								return ''
						}
					})(),
					mfc: $mfc,
					mfc_2: $director
        });
        try {
          doc.render();
        } catch (error) {
          errorHandler(error);
        }

        var out = doc.getZip().generate({
          type: "blob",
          mimeType:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        });
        saveAs(out, `Заявление ЕСИА ${
            document.querySelector("#lastNameField").value
          } ${document.querySelector("#firstNameField").value.substr(0,1)} ${
            document.querySelector("#secondNameField").value.substr(0,1)
          }.docx`);
      }
    );
  }
</script>

<style>
  button {
    padding-left: 32px;
    position: relative;
  }
  svg {
    width: 24px;
    height: 24px;
    position: absolute;
    left: 7px;
    top: 7px;
  }
</style>

<svelte:head>
  <script
    src="https://k00lagin.github.io/enhanced-arm-esia/js/docxtemplater-latest.min.js">
  </script>
  <script src="https://k00lagin.github.io/enhanced-arm-esia/js/pizzip.js">
  </script>
	<script src="https://k00lagin.github.io/enhanced-arm-esia/js/FileSaver.js"></script>
  <script src="https://k00lagin.github.io/enhanced-arm-esia/js/pizzip-utils.js">
  </script>
</svelte:head>
<button
  type="button"
  class="enhanced-print b-button-default"
  on:click={handlePrintClick}>
  <svg viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M6,2A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0
      20,20V8L14,2H6M6,4H13V9H18V20H6V4M8,12V14H16V12H8M8,16V18H13V16H8Z" />
  </svg>
  Распечатать
</button>

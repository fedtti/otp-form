class OtpForm extends HTMLElement {
  constructor() {
    super(); // Establish prototype chain.

    const shadow = this.attachShadow({ mode: 'open' }); // Attach shadow tree and return shadow root reference (cf. https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow).
    const otpFormContainer = document.createElement('div'); // Creating a container for the `otp-form` element.

    const digits = this.digits;

    otpFormContainer.innerHTML = `
      <style>
        form {
          margin: 0 auto;
          text-align: center;
        }
      </style>
      <form id="" action="" method="">
        <fieldset>
          <legend></legend>
          ${digits}
        </fieldset>
        <button type="submit">Submit</button>
      </form>
    `;

    shadow.appendChild(otpFormContainer);

  }

  get digits() {
    if (!this.getAttribute('digits')) throw new Error('You must specify the number of required digits.');
    
    let input: string = '';

    const digits: number[] = [...Array(Number(this.getAttribute('digits'))).keys()];

    for (const digit of digits) {
      input += `<input id="digit-${digit}" name="digit-${digit}" type="text" inputmode="numeric" pattern="\d{1}" autocomplete="off" required>\n`;
    }

    return input;
  }
}

customElements.define('otp-form', OtpForm); // Let the browser know about the custom element.

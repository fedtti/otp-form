class OtpForm extends HTMLElement {
  constructor() {
    super(); // Establish prototype chain.
    const shadow = this.attachShadow({ mode: 'open' }); // Attach shadow tree and return shadow root reference (cf. https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow).
    const otpFormContainer = document.createElement('div'); // Creating a container for the `otp-form` element.

    const action: string = this.getAttribute('action') || '';
    const method: string = this.getAttribute('method') || '';
    const legend: string = this.getAttribute('legend') || '';
    const digits: string = this.digits;

    otpFormContainer.innerHTML = `
      <form id="otp-form" class="flex flex-col items-center" action="${action}" method="${method}">
        <fieldset>
          <legend>${legend}</legend>
          ${digits}
          <input id="otp-value" name="otp-value" type="hidden" inputmode="numeric" pattern="\\d{${this.getAttribute('digits')}}" autocomplete="one-time-code" required>
        </fieldset>
        <button class="btn-primary" type="submit">Submit</button>
      </form>
    `;
    shadow.appendChild(otpFormContainer);
  }

  connectedCallback() {
    const form: HTMLFormElement = this.shadowRoot!.querySelector('form#otp-form')!;
    form.addEventListener('submit', this.handleFormSubmit, false);
  }

  get digits(): string {
    if (!this.getAttribute('digits')) throw new Error('You must specify the number of required digits.'); //
    let inputs: string = '';
    const digits: number[] = [...Array(Number(this.getAttribute('digits'))).keys()];
    for (const digit of digits) {
      inputs += `<input id="digit-${digit}" name="digit-${digit}" type="text" inputmode="numeric" pattern="\\d{1}" autocomplete="off" required>\n`;
    }
    return inputs;
  }

  handleFormSubmit(event: Event) {
    event.preventDefault();
    const otpValue: HTMLInputElement = this.querySelector('input#otp-value')!;
    const inputs = this.querySelectorAll<HTMLInputElement>('input[type="text"]');
    for (const input of inputs) {
      if (!input.value) throw new Error('You must specify a number for each input.');
      otpValue.value += input.value;
      input.value = '';
    }

    console.log(otpValue.value);
    otpValue.value = '';
  }
}

customElements.define('otp-form', OtpForm); // Let the browser know about the custom element.

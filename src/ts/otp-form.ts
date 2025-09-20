class OtpForm extends HTMLElement {
  constructor() {
    super(); // Establish prototype chain.
    const shadow = this.attachShadow({ mode: 'open' }); // Attach shadow tree and return shadow root reference (cf. https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow).
    const template = document.createElement('template'); // Creating a template tag for the `otp-form` element.

    const action: string = this.getAttribute('action') || '';
    const method: string = this.getAttribute('method') || '';
    const legend: string = this.getAttribute('legend') || '';
    const digits: string = this.digits;

    const style = document.createElement('style');
    style.textContent = `
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      form {
        background-color: white;
        border-radius: 1.2rem;
        box-shadow: 0 0.1rem 0.3rem 0 rgba(0, 0, 0, 0.1), 0 0.1rem 0.2rem -0.1rem rgba(0, 0, 0, 0.1);
        max-width: 44.8rem;
        padding: 4rem 3.2rem;
      }

      form p {
        margin: 1.6rem auto 0 auto;
        font-size: 1.4rem;
        line-height: 2rem;
        text-align: center;
      }

      fieldset {
        align-items: center;
        border: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 0 auto 1.6rem auto;
        text-align: center;
      }

      fieldset div p {
        font-size: 1.5rem;
        line-height: 2.25rem;
        margin: 0 auto;
        padding-block-end: 3.2rem;
      }

      legend {
        color: black;
        font-size: 2.4rem;
        font-weight: 700;
        line-height: 3.2rem;
        margin-bottom: 0.4rem;
        text-align: center;
      }

      p {
        color: rgb(100, 116, 139);
      }

      input {
        appeareance: none;
        background-color: rgb(241, 245, 249);
        border: 0.1rem solid rgb(241, 245, 249);
        border-radius: 0.4rem;
        color: rgb(15, 23, 42);
        font-family: inherit;
        font-size: 2.4rem;
        font-weight: 800;
        height: 5.6rem;
        line-height: 3.2rem;
        padding: 1.6rem;
        text-align: center;
        width: 5.6rem;
      }

      input[type="text"] {
        margin-inline-end: 1.2rem;
      }

      input[type="text"]:last-of-type {
        margin-inline-end: 0;
      }

      input:hover {
        border-color: rgb(226, 232, 240);
      }

      input:focus {
        border-color: rgb(129, 140, 248);
        background-color: white;
        box-shadow: 0 0 0 0.2rem rgb(224, 231, 255);
        outline: none;
      }

      button {
        background-color: rgb(99, 102, 241);
        border: 0;
        border-radius: 0.8rem;
        color: white;
        cursor: pointer;
        display: inline-flex;
        font-family: inherit;
        font-size: 1.4rem;
        font-weight: 500;
        height: 4rem;
        justify-content: center;
        line-height: 2rem;
        padding: 1rem 0;
        text-align: center;
        width: 100%;
      }

      button:hover {
        background-color: rgb(79, 70, 229);
      }

      button:focus {
        box-shadow: 0 0 0 0.3rem rgb(165, 180, 252);
      }

      a {
        color: rgb(99, 102, 241);
        font-weight: 500;
        text-decoration: none;
      }

      a:hover {
        color: rgb(79, 70, 229);
      }
    `;
    template.content.appendChild(style);
    template.innerHTML += `
      <form id="otp-form" action="${action}" method="${method}">
        <fieldset>
          <legend>${legend}</legend>
          <div>
            <p>Enter the ${this.getAttribute('digits')}-digit verification code that was sent to your phone number.</p>
          </div>
          <div>
            ${digits}
          </div>
          <input id="otp-value" name="otp-value" type="hidden" inputmode="numeric" pattern="\\d{${this.getAttribute('digits')}}" autocomplete="one-time-code" required>
        </fieldset>
        <button type="submit">Submit</button>
        <p>Didn’t receive code? <a href="#">Resend</a>.</p>
      </form>
    `;
    shadow.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const form: HTMLFormElement = this.shadowRoot!.querySelector('form#otp-form')!;
    form.addEventListener('submit', this.handleFormSubmit, false);
  }

  get digits(): string {
    if (!this.getAttribute('digits')) throw new Error('You must specify the number of required digits.');
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

    console.log(otpValue.value); // TODO: @fedtti - Remove before pushing into production.
    otpValue.value = '';
  }
}

customElements.define('otp-form', OtpForm); // Let the browser know about the custom element.

class MarkdownStateHandler {
  text: string;

  constructor() {
    this.text = '';
  }

  async setText(newText: string) {
    this.text = newText;
  }

  async getText() {
    return this.text;
  }
}

export default MarkdownStateHandler;

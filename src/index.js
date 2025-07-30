import './styles.css';

class InspectorToolbar {
  constructor(options = {}) {
    this.options = {
      position: 'top',
      height: '50px',
      backgroundColor: '#333',
      textColor: '#fff',
      ...options
    };
    
    this.toolbar = null;
    this.isVisible = false;
  }

  init() {
    this.createToolbar();
    this.attachToPage();
    return this;
  }

  createToolbar() {
    this.toolbar = document.createElement('div');
    this.toolbar.className = 'inspector-toolbar';
    this.toolbar.innerHTML = `
      <div class="inspector-toolbar-content">
        <span>Inspector Toolbar</span>
        <button class="inspector-toolbar-close">×</button>
      </div>
    `;

    this.applyStyles();
    this.bindEvents();
  }

  applyStyles() {
    Object.assign(this.toolbar.style, {
      position: 'fixed',
      top: this.options.position === 'top' ? '0' : 'auto',
      bottom: this.options.position === 'bottom' ? '0' : 'auto',
      left: '0',
      right: '0',
      height: this.options.height,
      backgroundColor: this.options.backgroundColor,
      color: this.options.textColor,
      zIndex: '9999',
      transform: this.options.position === 'top' ? 'translateY(-100%)' : 'translateY(100%)',
      transition: 'transform 0.3s ease'
    });
  }

  bindEvents() {
    const closeBtn = this.toolbar.querySelector('.inspector-toolbar-close');
    closeBtn.addEventListener('click', () => this.hide());
  }

  attachToPage() {
    document.body.appendChild(this.toolbar);
  }

  show() {
    if (!this.isVisible) {
      this.toolbar.style.transform = 'translateY(0)';
      this.isVisible = true;
    }
    return this;
  }

  hide() {
    if (this.isVisible) {
      const translateY = this.options.position === 'top' ? '-100%' : '100%';
      this.toolbar.style.transform = `translateY(${translateY})`;
      this.isVisible = false;
    }
    return this;
  }

  toggle() {
    return this.isVisible ? this.hide() : this.show();
  }

  destroy() {
    if (this.toolbar && this.toolbar.parentNode) {
      this.toolbar.parentNode.removeChild(this.toolbar);
    }
    this.toolbar = null;
    this.isVisible = false;
  }
}

export default InspectorToolbar;

if (typeof window !== 'undefined') {
  window.InspectorToolbar = InspectorToolbar;
}
import { WindowsDialog, LinuxDialog, MacOsDialog, Dialog } from './dialog';

class Application {
  dialog: Dialog

    // The application picks a creator's type depending on the
    // current configuration or environment settings.
  initialize() {
    const config = { OS: 'Linux' }

    if (config.OS === 'Windows') {
      this.dialog = new WindowsDialog()
    }

    if (config.OS === 'Linux') {
      this.dialog = new LinuxDialog()
    }

    if (config.OS === 'Macos') {
      this.dialog = new MacOsDialog()
    }
  }

  // The client code works with an instance of a concrete
  // creator, albeit through its base interface. As long as
  // the client keeps working with the creator via the base
  // interface, you can pass it any creator's subclass.
  main() {
    this.initialize();
    this.dialog.render()
  }
}
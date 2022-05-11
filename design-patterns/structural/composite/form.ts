

type Fields = {
  [key: string]: FormElement
}

type Data = {
  [key: string]: any
}

/**
 * The base Component class declares an interface for all concrete components,
 * both simple and complex.
 *
 * In our example, we'll be focusing on the rendering behavior of DOM elements.
 */
abstract class FormElement {
  protected _name: string;
  protected _title: string;
  protected _data: Data;

  constructor(name: string, title: string) {
    this._name = name;
    this._title = title;
  }

  getName(): string {
    return this._name;
  }

  setData(data: any): void {
    this._data = data;
  }

  getData(): Data {
    return this._data;
  }
  
  abstract render(): string;
}

/**
 * This is a Leaf component. Like all the Leaves, it can't have any children.
 */
class Input extends FormElement {
  private _type: string;

  constructor(name: string, title: string, type: string) {
    super(name, title)
    this._type = type;
  }

  /**
   * Since Leaf components don't have any children that may handle the bulk of
   * the work for them, usually it is the Leaves who do the most of the heavy-
   * lifting within the Composite pattern.
   */
  render(): string {
      return `
        <label for="${this._name}">${this._title}</label>
        <input name="${this._name}" type="${this._type}" value="{$this->data}">;
      `
  }
}

/**
 * The base Composite class implements the infrastructure for managing child
 * objects, reused by all Concrete Composites.
 */
class FieldComposite extends FormElement {
    protected _fields: FormElement[] = [];

     /**
     * The methods for adding/removing sub-objects.
     */
    add(field: FormElement) {
      this._fields.push(field)
    }

    remove(field: FormElement) {
      this._fields = this._fields.filter(f => f !== field)
    }

    /**
     * Whereas a Leaf's method just does the job, the Composite's method almost
     * always has to take its sub-objects into account.
     *
     * In this case, the composite can accept structured data.
     *
     * @param array $data
     */
    setData(value: Fields): void {
      this._fields.forEach((field: FormElement) => {
        if (value[field.getName()]) {
          field.setData(value[field.getName()])
        }
      })
    }

     /**
     * The same logic applies to the getter. It returns the structured data of
     * the composite itself (if any) and all the children data.
     */
    getData(): any {
      const result: Data[] = [];

      for (const fieldName in this._fields) {
        result.push(this._fields[fieldName].getData())
      }

      return result;
    }

    /**
     * The base implementation of the Composite's rendering simply combines
     * results of all children. Concrete Composites will be able to reuse this
     * implementation in their real rendering implementations.
     */
    render(): string {
      let result = '';

      this._fields.forEach((field: FormElement) => {
        result = result + field.render();
      });

      return result;
    }
}

/**
 * The fieldset element is a Concrete Composite.
 */
class FieldSet extends FieldComposite {
  render(): string {
    return `<fieldset><legend>${this._title}</legend>${super.render()}</fieldset>`;
  }
}

/**
 * And so is the form element.
 */
class Form extends FieldComposite {
  protected url: string;

  constructor(name: string, title: string, url: string) {
    super(name, title)
    this.url = url;
  }

  render(): string {
    return `
      <form action="${this.url}>
        <h3>${this._title}</h3>
        ${super.render()}
      </form>
    `;
  }
}

function getProductForm(): FormElement {
  const form = new Form('product', 'Add Product', '/product/acc');
  form.add(new Input('name', 'Name', 'text'));
  form.add(new Input('description', 'Description', 'text'));

  const picture = new FieldSet('photo', 'Product Photo');
  picture.add(new Input('caption', 'Caption', 'text'));
  picture.add(new Input('image', 'Image', 'file'));
  form.add(picture);

  return form;
}

function loadProductData(form: FormElement) {
  const data = {
    name: 'Apple Macbook',
    desctription: 'A decent laptop.',
    photo: {
      caption: 'Front Photo',
      image: 'photo1.png'
    }
  }

  form.setData(data)
}

function formDemo() {
  const form = getProductForm();
  loadProductData(form);

  const res = form.render();

  console.log(res)
}
formDemo()






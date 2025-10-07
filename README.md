 # React Component Library

Це Storybook-базована бібліотека UI-компонентів для React.

## Запуск
Встановити залежності:bash
npm install
npm run storybook
Відкрити у браузері:
http://localhost:6006

# Компоненти

## 1. Input

Типи: text, password, number

- Можливість очищення (clearable)  
- Для пароля: іконка toggle видимості

**Скріншоти:**

## 1. Input
import { Input } from "./components/Input";

 A versatile input component with multiple types and optional features like password toggle and clearable input.
 
Usage:
```<Input
  type="text"
  placeholder="Enter text"
  clearable
  showPasswordToggle
    />;
```
**Скріншоти:**
- **Input error**  
![Input error](https://github.com/RTSaitama/react-component-library/raw/main/screenshots/input-error.png)

- **Password input (toggle visibility)**  
![Password input](https://github.com/RTSaitama/react-component-library/raw/main/screenshots/input-password.png)

---





## 2. Toast
A notification component with smooth animations, auto-dismiss, and flexible positioning.

Usage:
import { Toast } from "./components/Toast";

```<Toast
  type="success"
  title="Success!"
  message="Operation completed successfully"
  duration={3000}
/>;
```

**Скріншоти:**
- **All Toasts**  
![All Toasts](https://github.com/RTSaitama/react-component-library/raw/main/screenshots/toasts-all.png)


- **Closable toast**  
![Closable toast](https://github.com/RTSaitama/react-component-library/raw/main/screenshots/toast-closable.png)

---

## 3. Sidebar Menu
A sliding sidebar menu with nested navigation and responsive design.

Usage:
```
import { SidebarMenu } from "./components/SidebarMenu";

const menuItems = [
  { id: "home", label: "Home" },
  { id: "settings", label: "Settings" },
];

<SidebarMenu
  isOpen={true}
  onClose={() => console.log("Closed")}
  items={menuItems}
/>;
```

**Скріншоти:**
- **Sidebar opened nested**  
![Sidebar opened nested](https://github.com/RTSaitama/react-component-library/raw/main/screenshots/sidebar-opened-nest.png)

- **Sidebar opened 1lvl**  
![Sidebar opened 1lvl](https://github.com/RTSaitama/react-component-library/raw/main/screenshots/sidebar-opened-firstLvl.png)



 
📖 Документація

Всі компоненти документовані у Storybook. Після запуску npm run storybook відкрийте http://localhost:6006
 для перегляду компонентів, пропсів та прикладів.

💡 Поради

Використовуйте Storybook для швидкого прототипування UI.

Компоненти повністю контрольовані через пропси.

Додавайте нові компоненти за шаблоном існуючих у src/components.
const components = {}
components.welcomeScreen = `
<h1>Welcome to Chat app</h1>
`
components.registerScreen = `
<div class="register-container">
<div class="aside-right">
  <div class="header">
    <h3>MindX chat</h3>
    
  </div>
  <form id="register-form">
    <div class="input-name-wrapper">
      <div class="input-wrapper">
        <input type="text" name="firstName" 
        placeholder="First name">
        <div class="error" id="first-name-error"></div>
      </div>
      <div class="input-wrapper">
        <input type="text" name="lastName" 
        placeholder="Last name">
        <div class="error" id="last-name-error"></div>
      </div>
    </div>
    <div class="input-wrapper">
      <input type="text" 
        placeholder="Email" 
        name="email">
      <div class="error" id="email-error"></div>
    </div>
    <div class="input-wrapper">
      <input type="password" 
        placeholder="Password" 
        name="password">
      <div class="error" 
        id="password-error"></div>
    </div>
    <div class="input-wrapper">
      <input type="password" 
        placeholder="Confirm password" 
        name="confirmPassword">
      <div class="error" 
        id="confirm-password-error"></div>
    </div>
    <div class="form-action">
      <span id="redirect-to-login">
        Already have an account? <span class="cursor-pointer" id="redirect-to-login">Login</span>
      </span>
      <button class="btn" type="submit">
        Register
      </button>
    </div>
  </form>
</div>
</div>
`
components.loginScreen = `
<div class="login-container">
<div class="aside-right">
    <div class="header">
        <h3>MindX chat</h3>
    </div>
    <form id="login-form">
        <div class="input-wrapper">
            <input type="text" placeholder="Email" name="email">
            <div class="error" id="email-error"></div>
        </div>
        <div class="input-wrapper">
            <input type="password" placeholder="Password" name="password">
            <div class="error" id="password-error"></div>
        </div>
        <div class="form-action">
            <span id="redirect-to-register">
                Don't have an account? <span class="cursor-pointer" id="redirect-to-register">Register</span>
            </span>
            <button class="btn" type="submit">
                Login
            </button>
        </div>
    </form>
</div>
</div>`;
components.chatScreen = `
<div class="chat-container">
<div class="header">
  MindX Chat
  <button class="log-out"><i class="fa fa-sign-out" aria-hidden="true"></i></button>
</div>
<div class="main">
  <div class="aside-left">
    <div class="create-conversation">
      <button class="btn">+ New conversation</button>
      
    </div>
    <div class="list-conversations">

    </div>
  </div>
  <div class="conversation-detail">
    <div class="conversation-header">
      First conversation
    </div>
    <div class="list-messages">
    </div>
    <form id="send-message-form">
      <div class="input-wrapper">
        <input type="text" name="message"
          placeholder="Type a message">
      </div>
      <button type="submit">
        <i class="fa fa-paper-plane" aria-hidden="true"></i>
      </button>
    </form>
  </div>
</div>
</div>
`
components.createConversationScreen = `
<div class="create-conversation-container">
<div class="header">
    MindX chat
</div>
<div class="main" style="padding: 50px 20%;">
    <form id="create-conversation-form">
        <div>
            Create a new conversation
        </div>
        <div class="input-wrapper">
            <input type="text" placeholder="Conversation name" name="conversationTitle">
            <div class="error" id="conversation-name-error"></div>
        </div>
        <div class="input-wrapper">
            <input type="text" placeholder="Friend email" name="conversationEmail">
            <div class="error" id="conversation-email-error"></div>
        </div>
        <button class='btn' type="submit">Save</button>
        <button class='btn btn-light' type="button" id="back-to-chat">Cancel</button>
    </form>
</div>
</div>
`
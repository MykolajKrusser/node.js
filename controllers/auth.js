exports.getLogin = (req, res)=>{
  res.render(
    'auth/login',
    {
      docTitle: 'Login', 
      path: '/login'
    }
  );
};
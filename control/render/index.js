exports.index = (req, res) => {
  res.redirect("dashboard");
};
exports.dashboardPage = (req, res) => {
    res.render("dashboard");
  };
exports.login = (req, res) => {
  res.render("index");
};
exports.register = (req, res) => {
  res.render("register");
};

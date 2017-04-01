'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
var path = require('path');

module.exports = yeoman.Base.extend({
  constructor: function () {
    yeoman.Base.apply(this, arguments);
    this.argument('componentName', {
      type: String,
      required: false
    });
  },

  prompting: function () {
    this.log(yosay(
      'Welcome to the ' + chalk.red('generator-react-component') + ' generator!'
    ));

    var prompts = [];

    if (!this.componentName) {
      prompts.push({
        type: 'input',
        name: 'componentName',
        message: 'What do you want to name your component?',
      });
    }

    return this.prompt(prompts).then(function (props) {
      this.props = props;
      this.props.componentName = _.capitalize(_.camelCase(this.props.componentName || this.componentName));

      Object.assign(this, this.props);
    }.bind(this));
  },

  writing: function () {
    var that = this;
    that.copy(
      that.templatePath('index.js'),
      that.destinationPath([that.props.componentName, '/index.js'].join(''))
    );
    that.copy(
      that.templatePath('Component.js'),
      that.destinationPath([that.props.componentName, '/', that.props.componentName + '.js'].join(''))
    );
  },

  install: function () {
    this.installDependencies();
  }
});

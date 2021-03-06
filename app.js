Date.prototype.yyyymmdd = function() {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();
    return [(dd > 9 ? '' : '0') + dd,
        (mm > 9 ? '' : '0') + mm,
        this.getFullYear()
         ].join('-');
};
var fs = require('fs');
var path = require('path');

var ncp = require('ncp').ncp;
var watch = require('node-watch');
var prependFile = require('prepend-file');
let source_server = "Q:/RageMP/RageSurvival/server"
let dest_server = "A:/RAGEMP/server-files/packages/RageSurvival"

ncp(source_server, dest_server, function(err) {
    if (err) {
        return console.error(err);
    }
    console.log('done!');
});
watch('./server', {
    recursive: true,
    persistent: true
}, function(evt, name) {
    console.log('%s changed.', name);
    let file = name.split("server")[1];
    console.log("file", file);
    console.log(source_server + file, dest_server + file);
    ncp(source_server + file, dest_server + file, function(err) {
        if (err) {
            return console.error(err);
        }
    });
});
let source_client = "Q:/RageMP/RageSurvival/client"
let dest_client = "A:/RAGEMP/server-files/client_packages/RageSurvival"
let exclude = "development"
ncp(source_client, dest_client, function(err) {
    if (err) {
        return console.error(err);
    }
    console.log('done!');
});
watch('./client', {
    recursive: true,
    persistent: true
}, function(evt, name) {
    console.log('%s changed.', name);
    let file = name.split("client")[1];
    if (name.indexOf(exclude) == -1) {
        console.log("file", file);
        console.log(source_client + file, dest_client + file);
        ncp(source_client + file, dest_client + file, function(err) {
            if (err) {
                return console.error(err);
            }
        });
    }
});
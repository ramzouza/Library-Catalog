from flask import Flask, Blueprint, render_template, flash, redirect, url_for, session, request, logging, send_from_directory, make_response 
from models import UserCatalog, User
from utils.responses import makeMsg
from flask_restful import Resource

class UserApi(Resource):
    '''Gets a user with id=id'''
    def get(self, id):
        return makeMsg(msg="User returned.", status=200, obj={'email':'jonthemango@gmail.com', 'hello':'ok'} )
        
    def post(self, email, password, fname, lname):
        return makeMsg(msg="User is created.", status=200, obj={})
        '''
            Creates a new User
        '''
	



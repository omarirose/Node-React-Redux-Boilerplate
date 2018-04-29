import { BodyParam, Get, JsonController, Post, Req, Res, UseBefore } from 'routing-controllers';
import TestService from '../services/TestService';
import { Inject } from 'typedi';
import { encode } from 'jwt-simple';
import Config from '../config/config';
import AuthMiddleware from '../middlewares/AuthMiddleware';

@JsonController()
export default class TestController {

    @Inject()
    testService: TestService;

    constructor() {
    }

    @UseBefore(AuthMiddleware)
    @Get('/testauth')
    testAuth(@Req() request: any, @Res() response: any) {
        return response.json({
            header: 'Your JWT data was verified and contains the following',
            data: {
                message: request.user
            }
        });
    }

    @Get('/getauth')
    getKey(@Res() response: any) {
        return response.json({ token: 'JWT ' + encode({ test: 'this is test data' }, Config.secret) });
    }

    @Post('/test')
    postTest(@BodyParam('message') message: String, @Res() res: any) {
        return res.json({ message: 'You posted "' + message + '"' });
    }

    @Post('/create')
    createTest(@BodyParam('test') test: String, @Res() res: any) {
        if (test) {
            console.log('testSerivce: ' + JSON.stringify(this.testService));
            const testObject = this.testService.createTest(test);
            return res.status(200).json(testObject);
        }
        return res.status(404).json({ error: 'Please enter a test message' });
    }

}
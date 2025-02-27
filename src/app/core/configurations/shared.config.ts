export const Configuration = {
    // languages: ['ar', 'en'],
    // defaultLang: 'ar',
    localStorageKeys: {
        currentLanguage: 'currentLanguage',
        userData: 'UserData',
        token: 'token'
    },
    APIs: {
        Auth: {
            login: 'api/UserManagement/GetLogin'
        },
        FileValidationManagement: {
            ValidateFile: 'api/FileValidationManagement/ValidateFile'
        },
        LookupManagement:{
            GetModuleList:'api/LookupManagement/GetModuleList',
            GetModuleItemList:'api/LookupManagement/GetModuleItemList'
        },
        ChatGPT:{
            getChatGPTResult:'api/ChatGPT/GetChatGPTResult'
        },
        Inbox: {
            getInboxMessages: "api/InboxManagement/GetInboxMessages",
            getSentMessages: "api/InboxManagement/GetSentMessages",
            createReplyMessage: "api/InboxManagement/CreateReplyMessage",
            markMessageAsRead: "api/InboxManagement/MarkMessageAsRead",
            clearMessage: "api/InboxManagement/ClearMessage",
        },
        Entrepreneur: {
            getEntrepreneurLookups: 'api/Entrepreneur/GetEntrepreneurLookups',
            getEntrepreneurInformation: 'api/Entrepreneur/GetEntrepreneurInformation',
            updateEntrepreneurInformation: 'api/Entrepreneur/UpdateEntrepreneurInformation',
            signUp: 'api/Entrepreneur/CreateEntrepreneur'
        },
        Project: {
            getProjectGeneralPlanningLookups: 'api/Project/GetProjectGeneralPlanningLookups',
            createProject: 'api/Project',
            updateProjectGeneralPlanning: 'api/Project/UpdateProjectGeneralPlanning',
            getProjectGeneralPlanning:'api/Project/GetProjectGeneralPlanning',
            getProjectMarketingPlanningLookups: 'api/Project/GetProjectMarketingPlanningLookups',
            getProjectMarketingPlanning: 'api/Project/GetProjectMarketingPlanning',
            updateProjectMarketingPlanning: 'api/Project/UpdateProjectMarketingPlanning',
            getProjectTechnicalPlanning: 'api/Project/GetProjectTechnicalPlanning',
            updateProjectTechnicalPlanning: 'api/Project/UpdateProjectTechnicalPlanning',
            getProjectFinancialPlanning: 'api/Project/GetProjectFinancialPlanning',
            updateProjectFinancialPlanning: 'api/Project/UpdateProjectFinancialPlanning',
        },
        User:{
            verifyUserEmail:'api/User/VerifyUserEmail'
        },
        Upload:{
            uploadFile:"api/Upload/UploadFile"
        },
    },
    modules: {
        dashboard: '/ectd',
        validate:'ectd/validate'
    },
    Auth:{
        login:'/authentication/login'
    },
    pages: {
    },
    httpResponseStatusCode: {
        unknownError: 0,
        // Client error responses
        badRequest: 400,
        unauthorized: 401,
        paymentRequiredExperimental: 402,
        forbidden: 403,
        notFound: 404,
        methodNotAllowed: 405,
        notAcceptable: 406,
        proxyAuthenticationRequired: 407,
        requestTimeout: 408,
        conflict: 409,
        gone: 410,
        lengthRequired: 411,

        // Server error responses
        internalServerError: 500,
        notImplemented: 501,
        badGateway: 502,
        serviceUnavailable: 503,
        gatewayTimeout: 504,
        hTTPVersionNotSupported: 505,
        variantAlsoNegotiates: 506,
        insufficientStorage: 507,
        loopDetected: 508,
        notExtended: 510,
        networkAuthenticationRequired: 511,
    }
}
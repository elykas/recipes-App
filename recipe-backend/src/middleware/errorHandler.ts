export const errorHandler = (err: any, req: any, res: any, next: any) => {
    if(process.env.NODE_ENV === 'test') {
        console.error(err.stack);
    }
    const response = {
        succsess: false,
        message: err.message,
        data:{}
    }
}
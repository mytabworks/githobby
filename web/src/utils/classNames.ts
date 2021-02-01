interface ObjectAny {
    [name: string]: boolean | undefined;
}

export default (defaultClass: string, systematicClass: ObjectAny, ...args: (string | undefined)[]) => (
    [Object.keys(systematicClass).reduce((result: string, className: string) => {
        if(systematicClass[className]) {
            return `${result} ${className}`
        }
        return result
    }, defaultClass), ...args.filter((v) => !!v)].join(" ")
)

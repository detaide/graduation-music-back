export function ConvertData<T = any>(data : any) : T
{
    return data as unknown as T
}
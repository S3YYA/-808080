#!/usr/bin/env python3
import sys, json, argparse, time
try:
    import requests
except Exception:
    requests = None
base_wheel = ["00110","00111","00101","00100","01100","01101","01111","01110","01010","01011","01001","01000","11000","11001","11011","11010","11110","11111","11101","11100","10100","10101","10111","10110","10010","10011","10001","10000","00000","00001","00011","00010"]
base_wheel = [s[::-1] for s in base_wheel]

print({"wheelData": base_wheel})
exit()

encoded_bits = "0010111100011010000101111111110110010010000100010111011001000110010000011111101101100111010000010101011001111110010000000111010001111110010000011"
def rotate(w,k):
    n=len(w); k=k%n
    return w[k:]+w[:k]
def main():
    p=argparse.ArgumentParser()
    p.add_argument("url", help="Target URL to POST to")
    p.add_argument("--delay",type=float,default=0.2)
    p.add_argument("--timeout",type=float,default=10.0)
    p.add_argument("--match",default="CTF{",help="Stop if decoded contains this")
    p.add_argument("--save",help="Save all responses to file")
    args=p.parse_args()
    if requests is None:
        print("requests library required (pip install requests)"); return
    session=requests.Session()
    results=[]
    try:
        for k in range(32):
            wheel=rotate(base_wheel,k)
            payload={"binaryInput": encoded_bits, "wheelData": wheel}
            print("Rotation",k)
            try:
                r=session.post(args.url,json=payload,timeout=args.timeout,headers={"Content-Type":"application/json"})
                text=r.text or ""
                print("HTTP",r.status_code,"len",len(text))
                try:
                    j=r.json()
                except Exception:
                    j=None
                print("Response JSON:", json.dumps(j) if j is not None else text[:1000])
                entry={"rotation":k,"status":r.status_code,"text":text,"json":j}
                results.append(entry)
                decoded=None
                if isinstance(j,dict) and "decoded" in j:
                    decoded=str(j["decoded"])
                if decoded:
                    if args.match in decoded or decoded not in ("MD","",None):
                        print("POSSIBLE DECODE FOUND at rotation",k)
                        print("decoded:",decoded)
                        if args.save:
                            open(args.save,"w").write(json.dumps(results,indent=2))
            except Exception as e:
                print("Request error:",e)
                results.append({"rotation":k,"error":str(e)})
                time.sleep(args.delay)
            time.sleep(args.delay)
    finally:
        session.close()
    if args.save:
        open(args.save,"w").write(json.dumps(results,indent=2))
    print("Done. Tried 32 rotations.")
if __name__=="__main__":
    main()

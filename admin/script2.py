#!/usr/bin/env python3
import json, argparse, time
try:
    import requests
except Exception:
    requests = None

base_wheel = ["00110","00111","00101","00100","01100","01101","01111","01110",
              "01010","01011","01001","01000","11000","11001","11011","11010",
              "11110","11111","11101","11100","10100","10101","10111","10110",
              "10010","10011","10001","10000","00000","00001","00011","00010"]

def rotate(wheel, k):
    n = len(wheel)
    k = k % n
    return wheel[k:] + wheel[:k]

def reverse_bits_list(lst):
    return [s[::-1] for s in lst]

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("url", help="Target URL to POST to")
    parser.add_argument("--delay", type=float, default=0.2)
    parser.add_argument("--timeout", type=float, default=10.0)
    parser.add_argument("--save", help="Save responses to a file")
    args = parser.parse_args()

    if requests is None:
        print("requests library required (pip install requests)")
        return

    session = requests.Session()
    results = []

    try:
        for k in range(32):
            wheel = rotate(base_wheel, k)
            reversed_wheel = reverse_bits_list(wheel)
            payload = {"wheelData": reversed_wheel}
            print(f"\n--- Rotation {k} ---")
            print("Payload to send:")
            print(json.dumps(payload, indent=2))
            try:
                r = session.post(args.url, json=payload, timeout=args.timeout, headers={"Content-Type":"application/json"})
                text = r.text or ""
                print("HTTP", r.status_code)
                print("Response:", text[:500])
                results.append({"rotation": k, "status": r.status_code, "response": text})
            except Exception as e:
                print("Request error:", e)
                results.append({"rotation": k, "error": str(e)})
            time.sleep(args.delay)
    finally:
        session.close()
    
    if args.save:
        with open(args.save, "w") as f:
            json.dump(results, f, indent=2)
    
    print("\nDone. Checked 32 rotations with reversed bit-strings.")

if __name__ == "__main__":
    main()

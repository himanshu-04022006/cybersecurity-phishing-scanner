import pandas as pd
import numpy as np
from sklearn.preprocessing import OneHotEncoder, StandardScaler

NUM_COLS = [
    "duration", "src_bytes", "dst_bytes", "pkts",
    "bytes_per_s", "pkts_per_s",
    "mean_pkt_len", "std_pkt_len",
    "syn_cnt", "rst_cnt"
]

CAT_COLS = ["proto", "service"]

def build_features(df: pd.DataFrame):
    df = df.copy()

    df["bytes_per_s"] = (df["src_bytes"] + df["dst_bytes"]) / np.clip(df["duration"], 0.001, None)
    df["pkts_per_s"] = df["pkts"] / np.clip(df["duration"], 0.001, None)

    for col in NUM_COLS:
        df[col] = df[col].replace([np.inf, -np.inf], np.nan).fillna(0)

    encoder = OneHotEncoder(handle_unknown="ignore", sparse_output=False)
    X_cat = encoder.fit_transform(df[CAT_COLS].fillna("unknown"))

    scaler = StandardScaler()
    X_num = scaler.fit_transform(df[NUM_COLS])

    X = np.hstack([X_num, X_cat])

    return X, encoder, scaler
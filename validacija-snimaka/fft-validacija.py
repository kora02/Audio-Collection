import librosa
import numpy as np
from fastdtw import fastdtw
from scipy.spatial.distance import euclidean

y1, sr1 = librosa.load('h-test.wav')
y2, sr2 = librosa.load('1.wav')

#padding za razlicite duzine fajlova
razlika_u_duzini = abs(len(y1) - len(y2))
if len(y1) > len(y2):
    y2 = np.pad(y2, (0, razlika_u_duzini), mode='constant')
else:
    y1 = np.pad(y1, (0, razlika_u_duzini), mode='constant')


#koristenje mfcc funkcije iz librosa biblioteke za feature extraction
mfcc1 = librosa.feature.mfcc(y=y1, sr=sr1, n_mfcc=13)
mfcc2 = librosa.feature.mfcc(y=y2, sr=sr2, n_mfcc=13)

#normalizacija
mfcc1_norm = (mfcc1 - np.mean(mfcc1)) / np.std(mfcc1)
mfcc2_norm = (mfcc2 - np.mean(mfcc2)) / np.std(mfcc2)

#racunanje i ispis dtw-a
distance, path = fastdtw(mfcc1_norm.T, mfcc2_norm.T, dist=euclidean)
print("DTW Distance:", distance)
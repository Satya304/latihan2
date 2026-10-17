
import { useState } from "react";
import "./DiskonPalindrom.css";

function DiskonPalindrom() {
  const [harga, setHarga] = useState("");
  const [nama, setNama] = useState("");
  const [hasil, setHasil] = useState(null);

  function cekDanHitung(e) {
    e.preventDefault();

    const totalHarga = Number(harga);
    const namaBersih = nama.toLowerCase().replace(/\s/g, "");

    if (
      !nama.trim() ||
      harga === "" ||
      !Number.isFinite(totalHarga) ||
      totalHarga < 0
    ) {
      alert("Masukkan nama dan total harga yang valid!");
      return;
    }

    const karakterUnik = new Set([...namaBersih]);
    const jumlahKarakterUnik = karakterUnik.size;

    const namaTerbalik = [...namaBersih].reverse().join("");

    const isPalindrom =
      namaBersih.length >= 3 &&
      namaBersih === namaTerbalik;

    let diskon;

    if (isPalindrom) {
      diskon = 25;
    } else {
      diskon = jumlahKarakterUnik;
    }

    const potongan = (totalHarga * diskon) / 100;
    const hargaAkhir = totalHarga - potongan;

    setHasil({
      status: isPalindrom ? "Palindrom" : "Bukan Palindrom",
      jumlahKarakterUnik,
      diskon,
      potongan,
      hargaAkhir,
    });
  }

  const rupiah = (angka) =>
    angka.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    });

  return (
    <div className="palindrom-container">
      <h1>Program Diskon Palindrom</h1>

      <form onSubmit={cekDanHitung}>
        <label>Total Harga Pembelian (Rp)</label>
        <input
          type="number"
          min="0"
          value={harga}
          onChange={(e) => setHarga(e.target.value)}
          placeholder="Masukkan total harga"
          required
        />

        <label>Nama Pelanggan</label>
        <input
          type="text"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          placeholder="Contoh: Anna"
          required
        />

        <button type="submit">Cek & Hitung</button>
      </form>

      {hasil && (
        <div className="palindrom-result">
          <h2>Hasil Perhitungan</h2>
          <p>Status Nama: <strong>{hasil.status}</strong></p>
          <p>Jumlah Karakter Unik: {hasil.jumlahKarakterUnik}</p>
          <p>Persentase Diskon: {hasil.diskon}%</p>
          <p>Total Potongan Harga: {rupiah(hasil.potongan)}</p>
          <p>Harga Pembelian Setelah Diskon: {rupiah(hasil.hargaAkhir)}</p>
        </div>
      )}
    </div>
  );
}

export default DiskonPalindrom;

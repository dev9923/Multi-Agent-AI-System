// Advanced Script for Multi Agent Router

let map, marker;

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("tracker-form");
  const input = document.getElementById("number-input");
  const resultDiv = document.getElementById("result");
  const mapDiv = document.getElementById("map");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const phoneNumber = input.value.trim();
    if (!phoneNumber) {
      showMessage("⚠️ Please enter a phone number.", "error");
      return;
    }

    showMessage("🔍 Tracking number...", "info");
    mapDiv.style.display = "none";

    try {
      const res = await fetch(`/api/track?number=${encodeURIComponent(phoneNumber)}`);
      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || "Tracking failed.");
      }

      displayResult(data);
      if (data.coordinates?.lat && data.coordinates?.lng) {
        initMap(data.coordinates.lat, data.coordinates.lng, data.location);
        mapDiv.style.display = "block";
      } else {
        mapDiv.style.display = "none";
        resultDiv.innerHTML += `<br/><small>⚠️ No map coordinates available.</small>`;
      }
    } catch (err) {
      console.error("Tracking Error:", err.message);
      showMessage(`❌ ${err.message}`, "error");
    }
  });

  function showMessage(message, type) {
    resultDiv.innerHTML = `<p class="${type}">${message}</p>`;
  }

  function displayResult(data) {
    resultDiv.innerHTML = `
      <strong>Number:</strong> ${data.number || 'N/A'} <br/>
      <strong>Country:</strong> ${data.country || 'N/A'} <br/>
      <strong>Location:</strong> ${data.location || 'N/A'} <br/>
      <strong>Carrier:</strong> ${data.carrier || 'N/A'} <br/>
      <strong>Line Type:</strong> ${data.line_type || 'N/A'} <br/>
    `;
  }

  function initMap(lat, lng, location = "Unknown") {
    if (!map) {
      map = L.map("map").setView([lat, lng], 10);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors"
      }).addTo(map);
      marker = L.marker([lat, lng]).addTo(map);
    } else {
      map.setView([lat, lng], 10);
      marker.setLatLng([lat, lng]);
    }

    marker.bindPopup(location).openPopup();
  }
});

import { ethers } from "ethers";
import EduCredABI from "../../EduCredABI.json";
import { useState } from "react";
import { GlowCard } from "../common/GlowCard";
import { Upload, FileText, CheckCircle, Clock, XCircle, Award } from "lucide-react";

const CONTRACT_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS";

async function getContract() {
  if (typeof window.ethereum === "undefined") {
    alert("MetaMask not detected!");
    return null;
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return new ethers.Contract(CONTRACT_ADDRESS, EduCredABI, signer);
}

export function CertificatesPage() {
  const [isDragging, setIsDragging] = useState(false);

  const certificates = [
    {
      name: "Blockchain Fundamentals Certificate",
      issuer: "NPTEL",
      date: "2024-09-15",
      status: "verified",
      credentialId: "BLK-2024-8734",
    },
    {
      name: "C++ Programming",
      issuer: "NPTEL",
      date: "2024-08-22",
      status: "verified",
      credentialId: "SMC-2024-5621",
    },
    {
      name: "Network and Security",
      issuer: "Coursera",
      date: "2024-10-01",
      status: "pending",
      credentialId: "CRY-2024-9012",
    },
    {
      name: "Advanced Web3 Development",
      issuer: "Udemy",
      date: "2024-10-10",
      status: "rejected",
      credentialId: "WEB3-2024-3456",
    },
  ];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (!file) return;

    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

    try {
      const contract = await getContract();
      if (!contract) {
        alert("⚠️ Smart contract not found. Please connect MetaMask.");
        return;
      }
      const tx = await contract.uploadCertificate(hashHex);
      await tx.wait();

      alert("✅ Certificate uploaded successfully to blockchain!");
    } catch (err) {
      console.error("❌ Error uploading certificate:", err);
      alert("Error uploading certificate to blockchain");
    }
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      verified: {
        icon: CheckCircle,
        color: "bg-[#E8F8F5] text-[#27AE60]",
        iconColor: "#27AE60",
      },
      pending: {
        icon: Clock,
        color: "bg-[#FEF3E7] text-[#F2994A]",
        iconColor: "#F2994A",
      },
      rejected: {
        icon: XCircle,
        color: "bg-[#FDEDEC] text-[#E74C3C]",
        iconColor: "#E74C3C",
      },
    };
    return badges[status as keyof typeof badges] || badges.pending;
  };

  return (
    <div className="flex-1 overflow-auto bg-[#F9FAFB]">
      <div className="p-8">
        {/* Header */}
        <div
          className="mb-8 rounded-2xl p-8 text-white shadow-lg"
          style={{ background: "linear-gradient(135deg, #2F80ED 0%, #56CCF2 100%)" }}
        >
          <h1 className="text-white mb-2 flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
              <Award className="w-6 h-6 text-white" />
            </div>
            My Certificates
          </h1>
          <p className="text-white/90">
            Upload and manage your blockchain-verified certificates
          </p>
        </div>

        {/* Upload Zone */}
        <GlowCard className="mb-8">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 ${
              isDragging
                ? "border-[#2F80ED] bg-[#EFF6FF]"
                : "border-[#E5E7EB] hover:border-[#2F80ED]"
            }`}
          >
            <div className="inline-block p-5 bg-[#EFF6FF] rounded-2xl mb-4">
              <Upload className="w-12 h-12 text-[#2F80ED]" />
            </div>

            <h3 className="text-[#1E1E1E] mb-2">Upload Certificate</h3>
            <p className="text-[#6B7280] mb-6">
              Drag and drop your certificate file here, or click below to upload
            </p>

            {/* ✅ Hidden input */}
            <input
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              id="fileInput"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const buffer = await file.arrayBuffer();
                  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
                  const hashArray = Array.from(new Uint8Array(hashBuffer));
                  const hashHex = hashArray
                    .map((b) => b.toString(16).padStart(2, "0"))
                    .join("");

                  const contract = await getContract();
                  if (!contract) {
                    alert("⚠️ Smart contract not found. Please connect MetaMask.");
                    return;
                  }

                  try {
                    const tx = await contract.uploadCertificate(hashHex);
                    await tx.wait();
                    alert(`✅ Certificate uploaded successfully!\nHash: ${hashHex}`);
                  } catch (error) {
                    console.error("Upload failed:", error);
                    alert("❌ Failed to upload certificate. Check console for details.");
                  }
                }
              }}
            />

            {/* ✅ White Browse Button */}
            <button
              onClick={() => document.getElementById("fileInput")?.click()}
              className="px-6 py-3 rounded-xl bg-white text-[#2F80ED] font-medium border border-[#2F80ED] hover:bg-[#EFF6FF] transition-all duration-200 shadow-sm"
            >
              Browse Files
            </button>

            <p className="text-[#6B7280] text-sm mt-4">
              Supported formats: PDF, PNG, JPG (Max 10MB)
            </p>
          </div>
        </GlowCard>

        {/* Certificates List */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[#1E1E1E]">Uploaded Certificates</h2>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-white text-[#6B7280] border border-[#E5E7EB] rounded-lg hover:bg-[#F3F4F6] hover:text-[#1E1E1E] transition-all duration-200 shadow-sm">
                Filter
              </button>
              <button className="px-4 py-2 bg-white text-[#6B7280] border border-[#E5E7EB] rounded-lg hover:bg-[#F3F4F6] hover:text-[#1E1E1E] transition-all duration-200 shadow-sm">
                Sort
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {certificates.map((cert, index) => {
              const statusBadge = getStatusBadge(cert.status);
              const StatusIcon = statusBadge.icon;

              return (
                <GlowCard key={index}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="w-12 h-12 rounded-lg bg-[#EFF6FF] flex items-center justify-center">
                        <FileText className="w-6 h-6 text-[#2F80ED]" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-[#1E1E1E] mb-1">{cert.name}</h4>
                        <p className="text-[#6B7280] text-sm">{cert.issuer}</p>
                      </div>
                    </div>
                    <StatusIcon
                      className="w-5 h-5"
                      style={{ color: statusBadge.iconColor }}
                    />
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#6B7280]">Issue Date:</span>
                      <span className="text-[#1E1E1E]">{cert.date}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#6B7280]">Credential ID:</span>
                      <span className="text-[#2F80ED]">{cert.credentialId}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span
                      className={`px-3 py-1 rounded-full text-sm capitalize ${statusBadge.color}`}
                    >
                      {cert.status}
                    </span>
                    <button className="text-[#2F80ED] text-sm hover:underline transition-colors">
                      View Details
                    </button>
                  </div>
                </GlowCard>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

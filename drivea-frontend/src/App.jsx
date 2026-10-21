import { useRef, useState } from "react";
import {
  Home,
  Folder,
  Clock3,
  Star,
  Trash2,
  Settings,
  Search,
  Bell,
  Upload,
  Plus,
  FileText,
  Image,
  Video,
  FileSpreadsheet,
  MoreVertical,
  Cloud,
  HardDrive,
  ChevronRight,
  X,
  FolderPlus,
  RotateCcw,
  Download,
  StarOff
} from "lucide-react";
import "./index.css";

const initialFiles = [
  {
    id: 1,
    name: "Project Report.pdf",
    type: "PDF",
    size: "2.4 MB",
    modified: "Today",
    category: "document",
    starred: true
  },
  {
    id: 2,
    name: "College Presentation.pptx",
    type: "PPT",
    size: "5.8 MB",
    modified: "Yesterday",
    category: "document",
    starred: false
  },
  {
    id: 3,
    name: "Project Dataset.xlsx",
    type: "XLSX",
    size: "1.2 MB",
    modified: "Yesterday",
    category: "spreadsheet",
    starred: true
  },
  {
    id: 4,
    name: "Dashboard Screenshot.png",
    type: "PNG",
    size: "3.1 MB",
    modified: "Sep 30",
    category: "image",
    starred: false
  },
  {
    id: 5,
    name: "Project Demo.mp4",
    type: "MP4",
    size: "18.6 MB",
    modified: "Sep 28",
    category: "video",
    starred: false
  }
];

const folders = [
  { id: 1, name: "College Projects", files: 12 },
  { id: 2, name: "Internship", files: 24 },
  { id: 3, name: "Documents", files: 18 },
  { id: 4, name: "Images", files: 36 }
];

const navigation = [
  { name: "Dashboard", icon: Home },
  { name: "My Files", icon: Folder },
  { name: "Recent", icon: Clock3 },
  { name: "Starred", icon: Star },
  { name: "Trash", icon: Trash2 }
];

function getFileIcon(type) {
  if (type === "PNG" || type === "JPG" || type === "JPEG") {
    return Image;
  }

  if (type === "MP4" || type === "MOV") {
    return Video;
  }

  if (type === "XLSX" || type === "CSV") {
    return FileSpreadsheet;
  }

  return FileText;
}

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [files, setFiles] = useState(initialFiles);
  const [trash, setTrash] = useState([]);
  const [search, setSearch] = useState("");
  const [showNewMenu, setShowNewMenu] = useState(false);
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [customFolders, setCustomFolders] = useState([]);
  const fileInputRef = useRef(null);

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(search.toLowerCase())
  );

  const recentFiles = [...files];

  const starredFiles = files.filter((file) => file.starred);

  const displayedFiles =
    activePage === "Starred"
      ? starredFiles
      : activePage === "Recent"
      ? recentFiles
      : filteredFiles;

  const totalStorage = 50;
  const usedStorage = 15.2;
  const storagePercentage = (usedStorage / totalStorage) * 100;

  function handleUpload(event) {
    const selectedFiles = Array.from(event.target.files || []);

    const newFiles = selectedFiles.map((file, index) => ({
      id: Date.now() + index,
      name: file.name,
      type: file.name.split(".").pop()?.toUpperCase() || "FILE",
      size: formatFileSize(file.size),
      modified: "Just now",
      category: file.type.split("/")[0] || "file",
      starred: false
    }));

    setFiles((current) => [...newFiles, ...current]);
    setShowNewMenu(false);

    event.target.value = "";
  }

  function formatFileSize(bytes) {
    if (bytes === 0) return "0 KB";

    const units = ["Bytes", "KB", "MB", "GB"];
    const index = Math.floor(Math.log(bytes) / Math.log(1024));

    return `${(bytes / Math.pow(1024, index)).toFixed(1)} ${units[index]}`;
  }

  function toggleStar(id) {
    setFiles((current) =>
      current.map((file) =>
        file.id === id ? { ...file, starred: !file.starred } : file
      )
    );
  }

  function moveToTrash(id) {
    const file = files.find((item) => item.id === id);

    if (!file) return;

    setTrash((current) => [file, ...current]);
    setFiles((current) => current.filter((item) => item.id !== id));
  }

  function restoreFile(id) {
    const file = trash.find((item) => item.id === id);

    if (!file) return;

    setFiles((current) => [file, ...current]);
    setTrash((current) => current.filter((item) => item.id !== id));
  }

  function permanentlyDelete(id) {
    setTrash((current) => current.filter((item) => item.id !== id));
  }

  function createFolder() {
    const name = folderName.trim();

    if (!name) return;

    setCustomFolders((current) => [
      ...current,
      {
        id: Date.now(),
        name,
        files: 0
      }
    ]);

    setFolderName("");
    setShowFolderModal(false);
    setShowNewMenu(false);
  }

  function renderFileRow(file, isTrash = false) {
    const FileIcon = getFileIcon(file.type);

    return (
      <div className="file-row" key={file.id}>
        <div className="file-name">
          <div className="file-icon">
            <FileIcon size={20} />
          </div>

          <strong>{file.name}</strong>
        </div>

        <span>{file.type}</span>
        <span>{file.size}</span>
        <span>{file.modified}</span>

        <div className="file-actions">
          {!isTrash && (
            <button
              className={`mini-action ${file.starred ? "starred" : ""}`}
              title={file.starred ? "Remove from starred" : "Star file"}
              onClick={() => toggleStar(file.id)}
            >
              {file.starred ? <Star size={16} fill="currentColor" /> : <Star size={16} />}
            </button>
          )}

          {isTrash ? (
            <>
              <button
                className="mini-action"
                title="Restore"
                onClick={() => restoreFile(file.id)}
              >
                <RotateCcw size={16} />
              </button>

              <button
                className="mini-action danger"
                title="Delete permanently"
                onClick={() => permanentlyDelete(file.id)}
              >
                <Trash2 size={16} />
              </button>
            </>
          ) : (
            <button
              className="mini-action danger"
              title="Move to trash"
              onClick={() => moveToTrash(file.id)}
            >
              <Trash2 size={16} />
            </button>
          )}

          <button className="more-button">
            <MoreVertical size={18} />
          </button>
        </div>
      </div>
    );
  }

  function renderFilesPage() {
    if (activePage === "Trash") {
      return (
        <>
          <div className="page-heading">
            <div>
              <h2>Trash</h2>
              <p>Files you've moved to the trash</p>
            </div>
          </div>

          {trash.length > 0 ? (
            <div className="file-table">
              <div className="file-table-header">
                <span>Name</span>
                <span>Type</span>
                <span>Size</span>
                <span>Modified</span>
                <span></span>
              </div>

              {trash.map((file) => renderFileRow(file, true))}
            </div>
          ) : (
            <div className="empty-state">
              <Trash2 size={38} />
              <h3>Trash is empty</h3>
              <p>Files you delete will appear here.</p>
            </div>
          )}
        </>
      );
    }

    return (
      <>
        <div className="page-heading">
          <div>
            <h2>
              {activePage === "Starred"
                ? "Starred Files"
                : activePage === "Recent"
                ? "Recent Files"
                : "My Files"}
            </h2>

            <p>
              {activePage === "Starred"
                ? "Your favourite files"
                : activePage === "Recent"
                ? "Files you've recently accessed"
                : "All your files and folders"}
            </p>
          </div>
        </div>

        {displayedFiles.length > 0 ? (
          <div className="file-table">
            <div className="file-table-header">
              <span>Name</span>
              <span>Type</span>
              <span>Size</span>
              <span>Modified</span>
              <span></span>
            </div>

            {displayedFiles.map((file) => renderFileRow(file))}
          </div>
        ) : (
          <div className="empty-state">
            <Folder size={38} />
            <h3>No files found</h3>
            <p>There are no files matching your current view.</p>
          </div>
        )}
      </>
    );
  }

  function renderDashboard() {
    return (
      <>
        <div className="welcome-row">
          <div>
            <p className="eyebrow">MY CLOUD STORAGE</p>
            <h1>Dashboard</h1>
            <p className="subtitle">
              Manage your files, folders and documents in one place.
            </p>
          </div>

          <button
            className="upload-button"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload size={18} />
            Upload files
          </button>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon blue">
              <HardDrive size={21} />
            </div>

            <div>
              <span>Total Storage</span>
              <strong>50 GB</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon purple">
              <Folder size={21} />
            </div>

            <div>
              <span>Total Files</span>
              <strong>{files.length}</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon orange">
              <Clock3 size={21} />
            </div>

            <div>
              <span>Recent Files</span>
              <strong>{Math.min(files.length, 24)}</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon green">
              <Cloud size={21} />
            </div>

            <div>
              <span>Used Storage</span>
              <strong>{storagePercentage.toFixed(1)}%</strong>
            </div>
          </div>
        </div>

        <div className="section-heading">
          <div>
            <h2>Folders</h2>
            <p>Your frequently used folders</p>
          </div>

          <button
            className="view-button"
            onClick={() => setActivePage("My Files")}
          >
            View all <ChevronRight size={15} />
          </button>
        </div>

        <div className="folder-grid">
          {[...folders, ...customFolders].map((folder) => (
            <div className="folder-card" key={folder.id}>
              <div className="folder-icon">
                <Folder size={25} />
              </div>

              <div className="folder-info">
                <strong>{folder.name}</strong>
                <span>{folder.files} files</span>
              </div>

              <button className="more-button">
                <MoreVertical size={18} />
              </button>
            </div>
          ))}
        </div>

        <div className="section-heading files-heading">
          <div>
            <h2>Recent Files</h2>
            <p>Files you have recently accessed</p>
          </div>

          <button
            className="view-button"
            onClick={() => setActivePage("Recent")}
          >
            View all <ChevronRight size={15} />
          </button>
        </div>

        <div className="file-table">
          <div className="file-table-header">
            <span>Name</span>
            <span>Type</span>
            <span>Size</span>
            <span>Modified</span>
            <span></span>
          </div>

          {files.slice(0, 5).map((file) => renderFileRow(file))}
        </div>
      </>
    );
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-icon">
            <Cloud size={23} />
          </div>
          <span>DriveA</span>
        </div>

        <div className="new-wrapper">
          <button
            className="new-button"
            onClick={() => setShowNewMenu((value) => !value)}
          >
            <Plus size={20} />
            <span>New</span>
          </button>

          {showNewMenu && (
            <div className="new-menu">
              <button onClick={() => fileInputRef.current?.click()}>
                <Upload size={17} />
                Upload files
              </button>

              <button onClick={() => setShowFolderModal(true)}>
                <FolderPlus size={17} />
                New folder
              </button>
            </div>
          )}
        </div>

        <nav className="navigation">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                className={`nav-item ${
                  activePage === item.name ? "active" : ""
                }`}
                onClick={() => setActivePage(item.name)}
              >
                <Icon size={19} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <button className="nav-item">
            <Settings size={19} />
            <span>Settings</span>
          </button>

          <div className="storage-box">
            <div className="storage-title">
              <HardDrive size={18} />
              <span>Storage</span>
            </div>

            <div className="storage-bar">
              <div
                className="storage-used"
                style={{ width: `${storagePercentage}%` }}
              ></div>
            </div>

            <p>15.2 GB of 50 GB used</p>
            <button>Manage storage</button>
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="header">
          <div className="search-box">
            <Search size={19} />

            <input
              type="text"
              placeholder="Search files and folders..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="header-actions">
            <button className="icon-button">
              <Bell size={20} />
            </button>

            <div className="profile">
              <div className="avatar">S</div>

              <div>
                <strong>Sumedha</strong>
                <small>Free Plan</small>
              </div>
            </div>
          </div>
        </header>

        <section className="content">
          {activePage === "Dashboard"
            ? renderDashboard()
            : renderFilesPage()}
        </section>
      </main>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        hidden
        onChange={handleUpload}
      />

      {showFolderModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <div>
                <h3>Create new folder</h3>
                <p>Give your folder a name.</p>
              </div>

              <button
                className="close-button"
                onClick={() => setShowFolderModal(false)}
              >
                <X size={20} />
              </button>
            </div>

            <input
              autoFocus
              className="folder-input"
              placeholder="Folder name"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") createFolder();
              }}
            />

            <div className="modal-actions">
              <button
                className="cancel-button"
                onClick={() => setShowFolderModal(false)}
              >
                Cancel
              </button>

              <button className="create-button" onClick={createFolder}>
                Create folder
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

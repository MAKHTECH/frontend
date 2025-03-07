import { Card } from "@/components/ui/card"
import { GrpcExample } from "@/components/grpc-example"
import { BarChart, Users, ShieldCheck, Clock } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">SSO Dashboard</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card title="Active Users" value="1,234" icon={Users} trend="up" percentage="12" />
        <Card title="Auth Requests/min" value="567" icon={BarChart} trend="up" percentage="8" />
        <Card title="Failed Logins" value="42" icon={ShieldCheck} trend="down" percentage="3" />
        <Card title="Avg. Response Time" value="120ms" icon={Clock} trend="down" percentage="15" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <h2 className="mb-4 text-lg font-medium text-white">Recent Login Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-4 border-b border-border-color pb-4 last:border-0">
                <div className="h-10 w-10 rounded-full bg-accent-color flex items-center justify-center text-white font-bold">
                  {String.fromCharCode(64 + i)}
                </div>
                <div>
                  <p className="text-sm text-white">User{i} logged in successfully</p>
                  <p className="text-xs text-text-color">
                    {i} minute{i !== 1 ? "s" : ""} ago
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <h2 className="mb-4 text-lg font-medium text-white">SSO Service Status</h2>
          <div className="space-y-4">
            {[
              { name: "Authentication Service", status: "Operational", color: "green-color" },
              { name: "Token Service", status: "Operational", color: "green-color" },
              { name: "User Management", status: "Operational", color: "green-color" },
              { name: "Multi-factor Auth", status: "Degraded", color: "warning-color" },
              { name: "Audit Logging", status: "Operational", color: "green-color" },
            ].map((service) => (
              <div
                key={service.name}
                className="flex items-center justify-between border-b border-border-color pb-4 last:border-0"
              >
                <p className="text-sm text-white">{service.name}</p>
                <p className={`text-sm text-${service.color}`}>{service.status}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <GrpcExample />
    </div>
  )
}

